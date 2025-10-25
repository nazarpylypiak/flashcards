export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  tags?: string[];
  deckId: string;
  correctCount: number;
  incorrectCount: number;
}
