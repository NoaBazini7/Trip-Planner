'use client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { AttractionDTO } from '../../DTOs/AttractionDTO';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import DraggableAttraction from './draggableAttraction';
import DroppableCell from './droppableCell';
import { act, useEffect, useState } from 'react';
import { getDaysBetweenDates } from '../../utils/utils';
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

  const times = [
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
  ];

  const [activeId, setActiveId] = useState<string | null>(null);

  const activeAttraction = activeId
    ? attractions.find((attr: AttractionDTO) => attr.name === activeId) || {
        name: activeId,
      }
    : null;

  const [cellMap, setCellMap] = useState(new Map());

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
      setCellMap(prev => {
        const newMap = new Map(prev);
        newMap.set(over.id, active.id);
        return newMap;
      });

      console.log(`Attraction "${active.id}" dropped on "${over.id}"`);
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
        <div className="absolute text-white top-20 justify-center w-full text-center">
          {`${destination} ${dateRange.startDate ? new Date(dateRange.startDate).getFullYear() : ''}`}
        </div>
        <div className="p-5 flex flex-row justify-center w-screen absolute text-white top-40 h-[75vh]">
          <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex flex-col w-1/6 max-h-full overflow-auto overflow-x-hidden gap-2">
              <h2>Attractions:</h2>
              {attractions.map((attr: AttractionDTO) => (
                <DraggableAttraction key={attr.name} attraction={attr} />
              ))}
              <h2>Meals:</h2>
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
            <div className="flex flex-row gap-4 w-3/4 ml-5 mr-5">
              <div className="flex flex-col justify-evenly">
                {times.map(time => (
                  <div key={time} className="text-white text-center">
                    {time}:00
                  </div>
                ))}
              </div>

              <div className="flex flex-row w-full h-full">
                {Array.from(new Array(numberOfDays)).map((_, dayIndex) => (
                  <div key={dayIndex} className="flex flex-col w-full h-full">
                    <div className="text-center mb-2 font-bold h-5">
                      {' '}
                      Day {dayIndex + 1}
                    </div>
                    {times.map(time => (
                      <div
                        key={time}
                        className="w-full h-full flex flex-row bg-white/20"
                      >
                        <DroppableCell
                          key={time + dayIndex + 'droppable-cell'}
                          id={time + dayIndex + 'droppable-cell'}
                        >
                          {cellMap.get(time + dayIndex + 'droppable-cell') && (
                            <div className="w-full h-full flex items-center justify-center relative">
                              <p>
                                {cellMap.get(
                                  time + dayIndex + 'droppable-cell'
                                )}
                              </p>

                              <button
                                onClick={removeFromCell(
                                  cellMap.get(
                                    time + dayIndex + 'droppable-cell'
                                  ),
                                  time + dayIndex + 'droppable-cell'
                                )}
                                className="cursor-pointer text-red-500 absolute top-2 right-2"
                              >
                                x
                              </button>
                            </div>
                          )}
                        </DroppableCell>
                      </div>
                    ))}
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
