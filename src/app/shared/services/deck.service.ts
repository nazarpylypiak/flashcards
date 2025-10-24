import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private storageKey = 'flashcards-decks';
  private decks$ = new BehaviorSubject<Deck[]>(this.loadFromStorage());

  saveToStorage(decks: Deck[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(decks));
  }

  loadFromStorage(): Deck[] {
    const decks = localStorage.getItem(this.storageKey);
    return JSON.parse(decks) ?? [];
  }

  getDecks() {
    return this.decks$.asObservable();
  }

  addDeck(deck: Partial<Deck>) {
    const oldDecks = this.decks$.getValue();
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
    const decks = this.decks$
      .getValue()
      .map((d) => (d.id === deck.id ? deck : d));
    this.saveToStorage(decks);
    return of(deck);
  }

  deleteDeck(id: string) {
    const decks = this.decks$.getValue().filter((d) => id !== d.id);
    this.saveToStorage(decks);
    return of({ message: 'delete successfully' });
  }
}
