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
      className="rounded p-2 bg-gray-600 text-left h-full w-11/12 cursor-grab"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {attraction.name}
    </button>
  );
}
