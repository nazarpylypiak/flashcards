import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { DeckFormComponent } from '@components/deck-form/deck-form.component';
import { loadDeckById, updateDeck } from '@core/store/actions/deck.actions';
import { selectSelectedDeck } from '@core/store/selectors/deck.selectors';
import { Deck } from '@models/deck.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-deck-detail',
  imports: [
    AsyncPipe,
    MatProgressBarModule,
    MatCardModule,
    DeckFormComponent,
    MatButtonModule,
  ],
  templateUrl: './deck-detail.component.html',
  styleUrl: './deck-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  edit = signal(false);

  public deck$ = this.store.select(selectSelectedDeck);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadDeckById({ id }));
  }

  onUpdate(deck: Deck) {
    this.store.dispatch(updateDeck({ deck }));
    this.edit.set(false);
  }
}
