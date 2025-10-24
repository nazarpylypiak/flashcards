import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import {
  DeckDialogComponent,
  DeckDialogData,
} from '@shared/dialogs/deck-dialog.component';
import { Deck } from '@shared/models/deck.model';
import * as DeckActions from '@store/actions/deck.actions';
import {
  selectAllDecks,
  selectError,
  selectLoading,
} from '@store/selectors/deck.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deck-list',
  imports: [AsyncPipe, MatCardModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './deck-list.component.html',
  styleUrl: './deck-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckListComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  decks$: Observable<Deck[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor() {
    this.decks$ = this.store.select(selectAllDecks);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(DeckActions.loadDecks());
  }

  deckClick(deck: Deck) {}

  editDeck(deck: Deck) {
    const dialogRef = this.dialog.open<
      DeckDialogComponent,
      DeckDialogData,
      Deck
    >(DeckDialogComponent, { data: { deck, mode: 'edit' } });

    dialogRef.afterClosed().subscribe({
      next: (deck) => {
        this.store.dispatch(DeckActions.updateDeck({ deck }));
      },
    });
  }

  deleteDeck(id: string) {
    this.store.dispatch(DeckActions.deleteDeck({ id }));
  }
}
