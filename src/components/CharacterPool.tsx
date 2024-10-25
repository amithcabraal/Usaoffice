import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { CharacterCard } from './CharacterCard';
import type { Character } from '../types';

interface Props {
  characters: Character[];
}

export function CharacterPool({ characters }: Props) {
  return (
    <Droppable droppableId="character-pool" direction="horizontal">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-white p-4 rounded-lg shadow-md mt-6"
        >
          <h2 className="text-xl font-bold mb-4">Characters</h2>
          <div className="flex flex-wrap gap-2">
            {characters.map((character, index) => (
              <CharacterCard key={character.id} character={character} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}