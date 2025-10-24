import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { DeckService } from '../../../shared/services/deck.service';
import * as DeckActions from '../actions/deck.actions';

@Injectable()
export class DeckEffects {
  private actions$ = inject(Actions);
  private deckService = inject(DeckService);

  loadDecks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeckActions.loadDecks),
      switchMap(() =>
        this.deckService.getDecks().pipe(
          map((decks) => DeckActions.loadDecksSuccess({ decks })),
          catchError((error) =>
            of(DeckActions.loadDecksFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  addDeck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeckActions.addDeck),
      switchMap(({ deck }) =>
        this.deckService.addDeck(deck).pipe(
          map((newDeck) => DeckActions.addDeckSuccess({ deck: newDeck })),
          catchError((error) =>
            of(DeckActions.addDeckFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  updateDeck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeckActions.updateDeck),
      switchMap(({ deck }) =>
        this.deckService.updateDeck(deck).pipe(
          map((updatedDeck) =>
            DeckActions.updateDeckSuccess({ deck: updatedDeck }),
          ),
          catchError((error) =>
            of(DeckActions.updateDeckFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  deleteDeck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeckActions.deleteDeck),
      switchMap(({ id }) =>
        this.deckService.deleteDeck(id).pipe(
          map(() => DeckActions.deleteDeckSuccess({ id })),
          catchError((error) =>
            of(DeckActions.deleteDeckFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
