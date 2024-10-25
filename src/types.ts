export interface Character {
  id: string;
  name: string;
  image: string;
}

export interface TierRow {
  id: string;
  label: string;
  color: string;
  characters: Character[];
}