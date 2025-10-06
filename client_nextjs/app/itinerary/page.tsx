'use client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { AttractionDTO } from '../../DTOs/AttractionDTO';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import DraggableAttraction from './draggableAttraction';
import DroppableCell from './droppableCell';
import { act, useEffect, useRef, useState } from 'react';
import { getDaysBetweenDates } from '../../utils/utils';
import { time } from 'console';
import { Rnd } from 'react-rnd';
import { relative } from 'path';
import TimeGrid from './timeGrid';
export default function ItineraryPage() {
  const searchParams = useSearchParams();

  const destination = searchParams.get('destination');
  const rawDateRange = searchParams.get('range');
  const dateRange = JSON.parse(rawDateRange || '{}');

  const numberOfDays =
    getDaysBetweenDates(
      new Date(dateRange.startDate),
      new Date(dateRange.endDate)
    ) + 1;
  const rawAttractions = searchParams.get('attractions');
  const attractions = JSON.parse(rawAttractions || '[]');

  type ScheduledAttraction = {
    id: string;
    day: number;
    startTimeIndex: number;
    duration: number; // in time slots
  };

  const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  const [activeId, setActiveId] = useState<string | null>(null);

  const activeAttraction = activeId
    ? attractions.find((attr: AttractionDTO) => attr.name === activeId) || {
        name: activeId,
      }
    : null;

  const [schedule, setSchedule] = useState<ScheduledAttraction[]>([]); //list of scheduled attractions
  const colRef = useRef<HTMLDivElement>(null);
  const [cellHeight, setCellHeight] = useState(0);
  const [colWidth, setColWidth] = useState(0);

  useEffect(() => {
    if (colRef.current) {
      const updateHeight = () => {
        setCellHeight(
          colRef.current ? colRef.current.offsetHeight / times.length : 0
        );
      };
      const updateWidth = () => {
        setColWidth(colRef.current ? colRef.current.offsetWidth : 0);
      };
      updateWidth();
      updateHeight();

      window.addEventListener('resize', updateHeight);
      window.addEventListener('resize', updateWidth);
      return () => {
        window.removeEventListener('resize', updateHeight);
        window.removeEventListener('resize', updateWidth);
      };
    }
  }, []);

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    setActiveId(null);

    if (over) {
      // active.id is the dragged attraction's id
      // over.id is the droppable cell's id
      if (!colRef.current || !active.rect.current) return;
      //calculate which time slot based on released y position
      const colRect = colRef.current?.getBoundingClientRect();
      const relativeY = active.rect.current.translated.top - colRect.top;
      const snappedStartHour = Math.round(relativeY / cellHeight);
      setSchedule(prev => [
        ...prev,
        {
          id: active.id,
          day: parseInt(over.id.split('-')[1]),
          startTimeIndex: snappedStartHour,
          duration: 1,
        },
      ]);

      console.log(
        `Attraction "${active.id}" dropped on "${over.id} at approx hour "${snappedStartHour} `
      );
    }
  }

  function removeFromCell(child: string, parent: string) {
    return () => {
      setCellMap(prev => {
        const newMap = new Map(prev);
        newMap.delete(parent);
        return newMap;
      });
    };
  }

  return (
    <div className="relative flex justify-center h-full w-full overflow-hidden">
      <Image
        src={'/itinerary.jpg'}
        alt={'itinerary'}
        width={1920}
        height={1080}
        className={'object-cover'}
      />
      <div className="absolute flex flex-col inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/0">
        <div className="absolute text-white top-15 justify-center w-full text-center ">
          <h1 className="text-4xl font-semibold tracking-wider">
            {`${destination} ${dateRange.startDate ? new Date(dateRange.startDate).getFullYear() : ''}`}
          </h1>
        </div>
        <div className="p-5 flex flex-row justify-between w-screen absolute text-white top-30 h-[80vh] bg-zinc-300/40">
          <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div
              className="p-2 flex flex-col w-1/6 max-h-full overflow-auto overflow-x-hidden gap-2 bg-zinc-300/20"
              dir="rtl"
            >
              <h2 dir="ltr" className="font-bold tracking-wider">
                Attractions:
              </h2>
              {attractions.map((attr: AttractionDTO) => {
                const isScheduled = schedule.some(
                  (s: ScheduledAttraction) => s.id === attr.name
                );
                return (
                  <div
                    key={attr.name}
                    className="relative flex flex-row items-center"
                    dir="ltr"
                  >
                    {isScheduled && (
                      <div className="absolute text-green-500">V</div>
                    )}
                    <DraggableAttraction attraction={attr} />
                  </div>
                );
              })}
              <h2 dir="ltr">Meals:</h2>
              <DraggableAttraction
                key={'Breakfast'}
                attraction={{
                  name: 'Breakfast',
                }}
              />
              <DraggableAttraction
                key={'Lunch'}
                attraction={{
                  name: 'Lunch',
                }}
              />
              <DraggableAttraction
                key={'Dinner'}
                attraction={{
                  name: 'Dinner',
                }}
              />
            </div>
            <div className="flex flex-row gap-3 w-4/5 ml-5 mr-5">
              <div
                className=" flex flex-col justify-center"
                style={{ gap: cellHeight - 16 }}
              >
                {times.map(time => (
                  <div key={time} className="text-white text-center text-xs">
                    {time}:00
                  </div>
                ))}
              </div>

              <div className="flex flex-row w-full h-full gap-1 bg-zinc-500 rounded-lg px-2 pb-2">
                {Array.from(new Array(numberOfDays)).map((_, dayIndex) => (
                  <div key={dayIndex} className="flex flex-col w-full h-full">
                    <div className="text-center m-2 h-5 mb-3">
                      {' '}
                      Day {dayIndex + 1}
                    </div>
                    <div className="flex flex-row  h-full w-full" ref={colRef}>
                      <DroppableCell
                        id={`day-${dayIndex}-col`}
                        key={`day-${dayIndex}-col`}
                      >
                        <TimeGrid numOfHours={times.length} />
                        <Rnd
                          className="flex flex-row h-full"
                          size={{
                            width: colWidth,
                            height: '100%',
                          }}
                          enableResizing={{
                            top: false,
                            right: false,
                            bottom: false,
                            left: false,
                            topRight: false,
                            bottomRight: false,
                            bottomLeft: false,
                            topLeft: false,
                          }}
                          disableDragging={true}
                        >
                          <div className="flex flex-row h-full justify-center">
                            {schedule
                              .filter(s => s.day === dayIndex)
                              .map(s => {
                                const attr = attractions.find(
                                  (a: AttractionDTO) => a.name === s.id
                                );
                                return (
                                  <div
                                    key={
                                      s.id +
                                      '-' +
                                      s.day +
                                      '-' +
                                      s.startTimeIndex
                                    }
                                    className="absolute w-11/12 bg-gray-700 text-white rounded p-1 text-xs font-light flex items-center justify-center border-1 border-gray-400"
                                    style={{
                                      top: s.startTimeIndex * cellHeight + 3,
                                      height: s.duration * cellHeight - 6,
                                    }}
                                  >
                                    {attr ? attr.name : s.id}
                                  </div>
                                );
                              })}
                          </div>
                        </Rnd>
                      </DroppableCell>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DragOverlay>
              {activeAttraction ? (
                <button
                  className="rounded p-2 bg-gray-700 text-left h-full w-full"
                  style={{
                    cursor: 'grabbing',
                  }}
                >
                  {activeAttraction.name}
                </button>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
