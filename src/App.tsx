import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TierRow } from './components/TierRow';
import { CharacterPool } from './components/CharacterPool';
import { characters as initialCharacters, initialTiers } from './data';
import { Trophy } from 'lucide-react';
import type { Character, TierRow as TierRowType } from './types';

function App() {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [tiers, setTiers] = useState<TierRowType[]>(initialTiers);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    let sourceItems: Character[] = [];
    let sourceSetterFn: (items: Character[]) => void;

    if (sourceId === 'character-pool') {
      sourceItems = characters;
      sourceSetterFn = setCharacters;
    } else {
      const sourceTier = tiers.find(t => t.id === sourceId);
      if (!sourceTier) return;
      sourceItems = sourceTier.characters;
    }

    const itemToMove = sourceItems[source.index];

    if (destId === 'character-pool') {
      const newSourceItems = [...sourceItems];
      newSourceItems.splice(source.index, 1);
      sourceSetterFn(newSourceItems);

      setCharacters(prev => {
        const newItems = [...prev];
        newItems.splice(destination.index, 0, itemToMove);
        return newItems;
      });
    } else {
      const newSourceItems = [...sourceItems];
      newSourceItems.splice(source.index, 1);

      if (sourceId === 'character-pool') {
        setCharacters(newSourceItems);
      } else {
        setTiers(prev =>
          prev.map(tier =>
            tier.id === sourceId
              ? { ...tier, characters: newSourceItems }
              : tier
          )
        );
      }

      setTiers(prev =>
        prev.map(tier =>
          tier.id === destId
            ? {
                ...tier,
                characters: [
                  ...tier.characters.slice(0, destination.index),
                  itemToMove,
                  ...tier.characters.slice(destination.index)
                ]
              }
            : tier
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">
            The Office Character Tier List
          </h1>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="space-y-2">
            {tiers.map(tier => (
              <TierRow key={tier.id} tier={tier} />
            ))}
          </div>

          <CharacterPool characters={characters} />
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;