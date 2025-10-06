'use client';
import { useDroppable } from '@dnd-kit/core';

export default function DroppableCell({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className="h-full w-full justify-center sm:text-xs  md:text-sm  lg:text-base bg-amber-800 flex flex-row items-center"
      ref={setNodeRef}
      style={{
        opacity: isOver ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
}
