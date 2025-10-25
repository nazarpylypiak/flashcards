import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Flashcard } from '@models/flashboard.model';

@Component({
  selector: 'app-flashcard-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './flashcard-form.component.html',
  styleUrl: './flashcard-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashcardFormComponent {
  readonly initialValue = signal<Flashcard | null>(null);
  readonly save = output<Flashcard>();

  id = computed(() => this.initialValue()?.id);

  form = new FormGroup({
    id: new FormControl(null),
    front: new FormControl<string | null>(null, [Validators.required]),
    back: new FormControl<string | null>(null, [Validators.required]),
  });

  get frontCtrl() {
    return this.form.controls.front;
  }

  get backCtrl() {
    return this.form.controls.back;
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value as Flashcard);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
