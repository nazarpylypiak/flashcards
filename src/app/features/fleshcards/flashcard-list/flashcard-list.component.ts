import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-flashcard-list',
  imports: [],
  templateUrl: './flashcard-list.component.html',
  styleUrl: './flashcard-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashcardListComponent {}
