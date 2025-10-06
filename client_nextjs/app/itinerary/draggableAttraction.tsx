'use client';
import { AttractionDTO } from '../../DTOs/AttractionDTO';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
export default function DraggableAttraction({
  attraction,
}: {
  attraction: AttractionDTO | { name: string };
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: attraction.name,
    });
  return (
    <button
      className="rounded p-2 px-5 hover:bg-zinc-500 text-left text-sm h-full w-full cursor-grab self-baseline"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {attraction.name}
    </button>
  );
}
