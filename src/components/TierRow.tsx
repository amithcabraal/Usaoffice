import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { CharacterCard } from './CharacterCard';
import type { TierRow as TierRowType } from '../types';

interface Props {
  tier: TierRowType;
}

export function TierRow({ tier }: Props) {
  return (
    <div className="flex mb-4">
      <div className={`${tier.color} w-16 flex items-center justify-center rounded-l-lg`}>
        <span className="text-white font-bold text-2xl">{tier.label}</span>
      </div>
      <Droppable droppableId={tier.id} direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 bg-gray-100 p-2 min-h-[100px] rounded-r-lg flex flex-wrap items-start content-start"
          >
            {tier.characters.map((character, index) => (
              <CharacterCard key={character.id} character={character} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}