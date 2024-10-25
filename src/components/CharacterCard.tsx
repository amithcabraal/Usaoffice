import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import type { Character } from '../types';

interface Props {
  character: Character;
  index: number;
}

export function CharacterCard({ character, index }: Props) {
  return (
    <Draggable draggableId={character.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col items-center bg-white rounded-lg shadow-md p-2 m-1 w-24"
        >
          <img
            src={character.image}
            alt={character.name}
            className="w-16 h-16 rounded-full object-cover mb-2"
          />
          <span className="text-xs font-medium text-center">{character.name}</span>
        </div>
      )}
    </Draggable>
  );
}