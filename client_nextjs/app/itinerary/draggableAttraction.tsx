'use client';
import { AttractionDTO } from '../../DTOs/AttractionDTO';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { mainColors, secondaryColors } from '../../utils/colors';
import React from 'react';
import { useState } from 'react';

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
  const hasDescription =
    attraction.hasOwnProperty('description') &&
    (attraction as AttractionDTO).description;

  return (
    <div className="relative">
      <button
        className="rounded-4xl px-3  flex flex-row items-center gap-1 justify-between text-left md:text-sm text-xs w-fit cursor-grab"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          height: maxHeight,
          //backgroundColor: mainColors.get(attraction.category.toLowerCase()),
          color: secondaryColors.get(attraction.category.toLowerCase()),
          border: `1px solid ${secondaryColors.get(attraction.category.toLowerCase())}`,
        }}
      >
        {' '}
        {children}
        {attraction.name}
        {hasDescription && (
          <div className="relative group ml-1">
            <span
              className="text-gray-400 cursor-pointer w-4 h-4 rounded-full items-center justify-center flex font-bold hover:opacity-70 hover:bg-gray-300"
              style={{ pointerEvents: 'auto' }}
            >
              i
            </span>
            <div className="absolute flex flex-col z-50 pointer-events-none p-2 text-xs text-white bg-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-5 transform -translate-x-11/12">
              {(attraction as AttractionDTO).description}
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
