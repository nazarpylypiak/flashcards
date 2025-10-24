import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Deck } from '@models/deck.model';

@Component({
  selector: 'app-deck-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckFormComponent {
  readonly initialValue = input<Deck | null>(null);
  readonly save = output<Deck>();

  readonly id = computed(() => this.initialValue()?.id);

  deckForm = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null),
  });

  get nameCtrl() {
    return this.deckForm.controls.name;
  }

  constructor() {
    effect(() => {
      const value = this.initialValue();
      if (!value) return;
      this.deckForm.patchValue({ ...value });
    });
  }

  onSubmit() {
    if (this.deckForm.valid) {
      this.save.emit(this.deckForm.value as Deck);
    } else {
      this.deckForm.markAllAsTouched();
    }
  }
}
