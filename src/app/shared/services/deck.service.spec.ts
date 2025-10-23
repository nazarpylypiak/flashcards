import exp = require('constants');
import { Deck } from '../models/deck.model';
import { DeckService } from './deck.service';

describe('DeckService', () => {
  let service: DeckService;
  const storageKey = 'flashcards-decks';
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => store[key] ?? null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete store[key];
        }),
        clear: jest.fn(() => {
          store = {};
        }),
      },
      writable: true,
    });

    service = new DeckService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load from local storage', () => {
    const mockDeck: Deck = { id: '0', name: 'Test Deck Name' } as Deck;
    localStorage.setItem(storageKey, JSON.stringify([mockDeck]));

    const decks = service.loadFromStorage();
    expect(decks).toHaveLength(1);
    expect(decks[0]).toEqual(mockDeck);
  });

  it('should return empty array if local storage empty', () => {
    const decks = service.loadFromStorage();

    expect(decks).toHaveLength(0);
    expect(decks).toEqual([]);
  });

  it('should redurn deck by id', (done) => {
    const deck: Deck = { id: '0', name: 'Deck 0' } as Deck;
    const deck1: Deck = { id: '1', name: 'Deck 1' } as Deck;

    localStorage.setItem(storageKey, JSON.stringify([deck, deck1]));
    service = new DeckService();

    service.getDeck('0').subscribe({
      next: (res) => {
        expect(res).toEqual(deck);
        done();
      },
    });
  });

  it('should update deck', (done) => {
    const deck: Deck = { id: '0', name: 'Deck 0' } as Deck;
    const deck1: Deck = { id: '1', name: 'Deck 1' } as Deck;

    localStorage.setItem(storageKey, JSON.stringify([deck, deck1]));
    service = new DeckService();

    service.updateDeck({ id: '0', name: 'Updated Deck 0' } as Deck);

    service.getDeck('0').subscribe({
      next: (res) => {
        expect(res.name).toBe('Updated Deck 0');
        done();
      },
    });
  });

  it('should delete deck', (done) => {
    const deck: Deck = { id: '0', name: 'Deck 0' } as Deck;
    const deck1: Deck = { id: '1', name: 'Deck 1' } as Deck;

    localStorage.setItem(storageKey, JSON.stringify([deck, deck1]));
    service = new DeckService();

    service.deleteDeck('0');

    service.getDecks().subscribe({
      next: (res) => {
        expect(res).toHaveLength(1);
        expect(res[0].id).toBe('1');
        done();
      },
    });
  });

  it('should save decks to localstorage and update BehaviourSubject', (done) => {
    const deck: Deck = { id: '0', name: 'Test Deck Name' } as Deck;
    service.saveToStorage([deck]);

    service.getDecks().subscribe({
      next: (res) => {
        expect(res).toHaveLength(1);
        expect(res[0]).toEqual(deck);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          storageKey,
          JSON.stringify([deck])
        );

        done();
      },
    });
  });

  it('should add dest', () => {
    service.addDeck({ id: '0', name: 'Test Deck Name' } as Deck);
    const decks = service.loadFromStorage();

    expect(decks);
  });
});
