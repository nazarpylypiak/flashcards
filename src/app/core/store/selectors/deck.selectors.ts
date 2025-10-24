import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeckState } from '../state/deck.state';

export const selectDeckState = createFeatureSelector<DeckState>('deck');

export const selectAllDecks = createSelector(
  selectDeckState,
  (state: DeckState) => state.decks,
);

export const selectSelectedDeck = createSelector(
  selectDeckState,
  (state: DeckState) => state.selectedDeck,
);

export const selectLoading = createSelector(
  selectDeckState,
  (state: DeckState) => state.loading,
);

export const selectError = createSelector(
  selectDeckState,
  (state: DeckState) => state.error,
);

export const selectDeckById = (id: string) =>
  createSelector(selectAllDecks, (decks) => decks.find((d) => d.id === id));
