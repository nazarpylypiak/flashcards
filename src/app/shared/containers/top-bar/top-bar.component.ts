import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { DeckDetailComponent } from '@features/decks/deck-detail/deck-detail.component';
import { ReqDeck } from '@models/deck.model';
import { Store } from '@ngrx/store';
import {
  DeckDialogComponent,
  DeckDialogData,
} from '@shared/dialogs/deck-dialog.component';
import * as DeckActions from '@store/actions/deck.actions';

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
  private dialog = inject(MatDialog);
  private store = inject(Store);

  searchControl = new FormControl('');

  clear() {
    this.searchControl.reset('');
  }

  addNewDeck() {
    const dialogRef = this.dialog.open<
      DeckDetailComponent,
      DeckDialogData,
      ReqDeck | null
    >(DeckDialogComponent, { data: { mode: 'add' } });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.store.dispatch(DeckActions.addDeck({ deck: res }));
      },
    });
  }
}
