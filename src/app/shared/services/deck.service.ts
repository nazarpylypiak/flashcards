import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private storageKey = 'flashcards-decks';
  private decks$ = new BehaviorSubject<Deck[]>(this.loadFromStorage());

  saveToStorage(decks: Deck[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(decks));
    this.decks$.next(decks);
  }

  loadFromStorage(): Deck[] {
    const decks = localStorage.getItem(this.storageKey);
    return JSON.parse(decks) ?? [];
  }

  getDecks() {
    return this.decks$.asObservable();
  }

  addDeck(deck: Deck) {
    const decks = [...this.decks$.getValue(), deck];
    this.saveToStorage(decks);
  }

  getDeck(id: string): Observable<Deck | null> {
    return this.getDecks().pipe(
      map((res) => {
        return res.find((d) => d.id === id) ?? null;
      })
    );
  }

  updateDeck(deck: Deck) {
    const decks = this.decks$
      .getValue()
      .map((d) => (d.id === deck.id ? deck : d));
    this.saveToStorage(decks);
  }

  deleteDeck(id: string) {
    const decks = this.decks$.getValue().filter((d) => id !== d.id);
    this.saveToStorage(decks);
  }
}
