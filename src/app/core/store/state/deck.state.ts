import { Deck } from '../../../shared/models/deck.model';

export interface DeckState {
  decks: Deck[];
  selectedDeck: Deck | null;
  loading: boolean;
  error: string | null;
}

export const initialDeckState: DeckState = {
  decks: [],
  selectedDeck: null,
  loading: false,
  error: null,
};
