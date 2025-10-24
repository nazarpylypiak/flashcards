import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private storageKey = 'flashcards-decks';

  saveToStorage(decks: Deck[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(decks));
  }

  loadFromStorage(): Deck[] {
    const decks = localStorage.getItem(this.storageKey);
    return JSON.parse(decks) ?? [];
  }

  getDecks() {
    return of(this.loadFromStorage());
  }

  addDeck(deck: Partial<Deck>) {
    const oldDecks = this.loadFromStorage();
    const newDeck: Deck = {
      ...deck,
      id: (oldDecks.length > 0
        ? +oldDecks[oldDecks.length - 1].id + 1
        : 0
      ).toString(),
    } as Deck;
    const decks = [...oldDecks, newDeck];
    this.saveToStorage(decks);
    return of(newDeck);
  }

  getDeck(id: string): Observable<Deck | null> {
    return this.getDecks().pipe(
      map((res) => {
        return res.find((d) => d.id === id) ?? null;
      }),
    );
  }

  updateDeck(deck: Deck) {
    const decks = this.loadFromStorage().map((d) =>
      d.id === deck.id ? deck : d,
    );
    this.saveToStorage(decks);
    return of(deck);
  }

  deleteDeck(id: string) {
    const decks = this.loadFromStorage().filter((d) => id !== d.id);
    this.saveToStorage(decks);
    return of({ message: 'delete successfully' });
  }
}
