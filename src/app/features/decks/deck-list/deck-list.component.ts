import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DeckService } from '../../../shared/services/deck.service';

@Component({
  selector: 'app-deck-list',
  imports: [AsyncPipe, MatCardModule],
  templateUrl: './deck-list.component.html',
  styleUrl: './deck-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckListComponent {
  deckService = inject(DeckService);

  decks$ = this.deckService.getDecks();
}
