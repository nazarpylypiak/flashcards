import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { DeckDetailComponent } from '../../../features/decks/deck-detail/deck-detail.component';
import {
  DeckDialogComponent,
  DeckDialogData,
} from '../../dialogs/deck-dialog.component';
import { Deck } from '../../models/deck.model';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-top-bar',
  imports: [
    MatToolbar,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  private deckService = inject(DeckService);
  private dialog = inject(MatDialog);

  searchControl = new FormControl('');

  clear() {
    this.searchControl.reset('');
  }

  addNewDeck() {
    const dialogRef = this.dialog.open<
      DeckDetailComponent,
      DeckDialogData,
      Deck | null
    >(DeckDialogComponent, { data: { mode: 'add' } });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
