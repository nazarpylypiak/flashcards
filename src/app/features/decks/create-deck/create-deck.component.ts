import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DeckFormComponent } from '@components/deck-form/deck-form.component';
import { addDeck } from '@core/store/actions/deck.actions';
import { Deck } from '@models/deck.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-deck',
  imports: [DeckFormComponent],
  templateUrl: './create-deck.component.html',
  styleUrl: './create-deck.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDeckComponent {
  private store = inject(Store);

  onSave(deck: Deck) {
    this.store.dispatch(addDeck({ deck }));
  }
}
