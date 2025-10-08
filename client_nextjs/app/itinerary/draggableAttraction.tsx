'use client';
import { AttractionDTO } from '../../DTOs/AttractionDTO';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { mainColors, secondaryColors } from '../../utils/colors';
export default function DraggableAttraction({
  attraction,
  maxHeight,
  maxWidth,
  children,
}: {
  attraction: AttractionDTO | { name: string; category: string };
  maxHeight?: number;
  maxWidth?: number;
  children?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: attraction.name,
    });

  return (
    <button
      className="rounded px-3  flex flex-row items-center justify-between text-left md:text-sm text-xs w-full cursor-grab "
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        height: maxHeight,
        width: maxWidth,
        //backgroundColor: mainColors.get(attraction.category.toLowerCase()),
        color: secondaryColors.get(attraction.category.toLowerCase()),
        border: `1px solid ${secondaryColors.get(attraction.category.toLowerCase())}`,
      }}
    >
      {attraction.name}
      {children}
    </button>
  );
}
