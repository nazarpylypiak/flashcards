import { Deck, ReqDeck } from '@models/deck.model';
import { createAction, props } from '@ngrx/store';

// Load Decks
export const loadDecks = createAction('[Deck] Load Decks');

export const loadDecksSuccess = createAction(
  '[Deck] Load Decks Success',
  props<{ decks: Deck[] }>(),
);

export const loadDecksFailure = createAction(
  '[Deck] Load Decks Failure',
  props<{ error: string }>(),
);

// Add Deck
export const addDeck = createAction(
  '[Deck] Add Deck',
  props<{ deck: ReqDeck }>(),
);

export const addDeckSuccess = createAction(
  '[Deck] Add Deck Success',
  props<{ deck: Deck }>(),
);

export const addDeckFailure = createAction(
  '[Deck] Add Deck Failure',
  props<{ error: string }>(),
);

// Update Deck
export const updateDeck = createAction(
  '[Deck] Update Deck',
  props<{ deck: Deck }>(),
);

export const updateDeckSuccess = createAction(
  '[Deck] Update Deck Success',
  props<{ deck: Deck }>(),
);

export const updateDeckFailure = createAction(
  '[Deck] Update Deck Failure',
  props<{ error: string }>(),
);

// Delete Deck
export const deleteDeck = createAction(
  '[Deck] Delete Deck',
  props<{ id: string }>(),
);

export const deleteDeckSuccess = createAction(
  '[Deck] Delete Deck Success',
  props<{ id: string }>(),
);

export const deleteDeckFailure = createAction(
  '[Deck] Delete Deck Failure',
  props<{ error: string }>(),
);

// Select Deck
export const selectDeck = createAction(
  '[Deck] Select Deck',
  props<{ deck: Deck }>(),
);

export const clearError = createAction('[Deck] Clear Error');
