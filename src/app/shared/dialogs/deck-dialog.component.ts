import { Component, inject, model, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Deck } from '../models/deck.model';

export interface DeckDialogData {
  deck?: Deck | null | undefined;
  mode: 'add' | 'edit';
}

@Component({
  selector: 'app-deck-dialog',
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './deck-dialog.component.html',
  styleUrl: './deck-dialog.component.scss',
})
export class DeckDialogComponent {
  @ViewChild('nameCtrl') nameCtrl: NgModel;
  public data: DeckDialogData = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DeckDialogComponent>);

  title = this.data.mode === 'add' ? 'Add Deck' : 'Edit Deck';

  name = model(this.data?.deck?.name ?? '');

  addDeck() {
    if (this.nameCtrl.invalid) return;

    this.dialogRef.close({
      ...this.data.deck,
      name: this.name(),
    });
  }
}
