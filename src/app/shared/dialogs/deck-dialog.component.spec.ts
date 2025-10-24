import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeckDialogComponent } from './deck-dialog.component';

describe('DeckDialogComponent', () => {
  let component: DeckDialogComponent;
  let fixture: ComponentFixture<DeckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeckDialogComponent,
        FormsModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { mode: 'add', deck: null } },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
