import { Flashcard } from './flashboard.model';

export interface Deck {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  flashcards: Flashcard[];
}
