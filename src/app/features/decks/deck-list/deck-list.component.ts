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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
  private router = inject(Router);

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

  deckClick(deck: Deck) {
    this.router.navigate(['decks', deck.id]);
  }

  editDeck(deck: Deck) {
    this.router.navigate(['decks', deck.id]);
  }

  deleteDeck(id: string) {
    this.store.dispatch(DeckActions.deleteDeck({ id }));
  }
}
