// interfaces.ts
export interface Card {
  id: string;
  name: string;
  set_name: string;
  collector_number: string;
  rarity: string;
  image_uris?: { normal: string };
  card_faces?: { image_uris?: { normal: string } }[];
}

export interface AppState {
  searchResults: Card[];
  searchedTerm: string;
  hasSearched: boolean;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface CardListProps {
  cards: Card[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  searchTerm: string;
}

export interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm?: string;
}