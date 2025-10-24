import { DeckState, initialDeckState } from '@store/state/deck.state';

export interface AppState {
  deck: DeckState;
}

export const appInitialState = {
  deck: initialDeckState,
};
