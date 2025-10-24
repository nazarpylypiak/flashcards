import { createReducer, on } from '@ngrx/store';
import * as DeckActions from '../actions/deck.actions';
import { initialDeckState } from '../state/deck.state';

export const deckReducer = createReducer(
  initialDeckState,

  // Load Decks
  on(DeckActions.loadDecks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DeckActions.loadDecksSuccess, (state, { decks }) => ({
    ...state,
    decks,
    loading: false,
  })),
  on(DeckActions.loadDecksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Deck
  on(DeckActions.addDeck, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DeckActions.addDeckSuccess, (state, { deck }) => ({
    ...state,
    decks: [...state.decks, deck],
    loading: false,
  })),
  on(DeckActions.addDeckFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Deck
  on(DeckActions.updateDeck, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DeckActions.updateDeckSuccess, (state, { deck }) => ({
    ...state,
    decks: state.decks.map((d) => (d.id === deck.id ? deck : d)),
    selectedDeck:
      state.selectedDeck?.id === deck.id ? deck : state.selectedDeck,
    loading: false,
  })),
  on(DeckActions.updateDeckFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Deck
  on(DeckActions.deleteDeck, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DeckActions.deleteDeckSuccess, (state, { id }) => ({
    ...state,
    decks: state.decks.filter((d) => d.id !== id),
    selectedDeck: state.selectedDeck?.id === id ? null : state.selectedDeck,
    loading: false,
  })),
  on(DeckActions.deleteDeckFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load deck
  on(DeckActions.loadDeckById, (state) => ({
    ...state,
    loading: true,
  })),
  on(DeckActions.loadDeckByIdSuccess, (state, { deck }) => ({
    ...state,
    selectedDeck: deck,
  })),
  on(DeckActions.loadDeckByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Clear Error
  on(DeckActions.clearError, (state) => ({
    ...state,
    error: null,
  })),
);
