'use client';
import { useDroppable } from '@dnd-kit/core';

export default function DroppableCell({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const { isOver, setNodeRef } =
    useDroppable({
      id: id,
    });

  return (
    <div
      className="w-full h-full sm:text-xs  md:text-sm  lg:text-base border-2 border-dashed border-gray-500 flex flex-row items-center justify-center"
      ref={setNodeRef}
      style={{
        opacity: isOver ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
}
