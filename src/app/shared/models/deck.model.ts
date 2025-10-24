import { Flashcard } from './flashboard.model';

export interface Deck {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  flashcards: Flashcard[];
}

export type ReqDeck = Omit<Deck, 'id' | 'createdAt' | 'updatedAt'>;
