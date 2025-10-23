import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { Deck } from '../../../shared/models/deck.model';
import { DeckListComponent } from './deck-list.component';
import exp = require('constants');

describe('DeckListComponent', () => {
  describe('Rendering', () => {
    let component: DeckListComponent;
    let fixture: ComponentFixture<DeckListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DeckListComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DeckListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display "no decks" message when decks are empty', () => {
      component.decks$ = of([]);

      fixture.detectChanges();

      const messageEl = fixture.nativeElement.querySelector(
        '[data-testId="empty-decks"]',
      );
      expect(messageEl.textContent).toContain('No decks');
    });

    it('should display correct name of deck', () => {
      component.decks$ = of([{ id: '0', name: 'Deck name' } as Deck]);
      fixture.detectChanges();

      const name = fixture.nativeElement.querySelector(
        '[data-testId="deck-name"]',
      );
      expect(name.textContent).toContain('Deck name');
    });
    it('should display all decks when decks array has items', () => {
      component.decks$ = of([
        { id: '0', name: 'Deck name' } as Deck,
        { id: '1', name: 'Deck name 1' } as Deck,
      ]);
      fixture.detectChanges();

      const deckCard = fixture.nativeElement.querySelectorAll(
        '[data-testId="deck-card"]',
      );
      expect(deckCard).toHaveLength(2);
    });
    it('should show correct number of decks items', () => {
      component.decks$ = of([
        { id: '0', name: 'Deck name' } as Deck,
        { id: '1', name: 'Deck name 1' } as Deck,
      ]);
      fixture.detectChanges();

      const deckCardCount = fixture.nativeElement.querySelector(
        '[data-testId="deck-card-count"]',
      );
      expect(deckCardCount.textContent).toBe(2);
    });
  });

  describe('interactions', () => {
    let component: DeckListComponent;
    let fixture: ComponentFixture<DeckListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DeckListComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DeckListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should call editDeck when edit button clicked', () => {
      component.decks$ = of([{ id: '0', name: 'Deck name' } as Deck]);

      const editButton: HTMLButtonElement = fixture.nativeElement.querySelector(
        '[data-testId="edit-btn"]',
      );
      editButton.click();
      fixture.detectChanges();

      expect(component.editDeck).toHaveBeenCalled();
    });
    it('should call deleteDeck when delete button clicked', () => {
      component.decks$ = of([{ id: '0', name: 'Deck name' } as Deck]);

      const editButton: HTMLButtonElement = fixture.nativeElement.querySelector(
        '[data-testId="delete-btn"]',
      );
      editButton.click();
      fixture.detectChanges();

      expect(component.deleteDeck).toHaveBeenCalled();
    });
    it('should navigate to deck details on click', () => {
      const deck = { id: '0', name: 'Deck name' } as Deck;
      component.decks$ = of([deck]);

      const deckCard = fixture.nativeElement.querySelectorAll(
        '[data-testId="deck-card"]',
      );
      deckCard.click();
      fixture.detectChanges();
      expect(component.deckClick).toHaveBeenCalledWith(deck);
    });
  });

  describe('state & conditional rendering', () => {
    let component: DeckListComponent;
    let fixture: ComponentFixture<DeckListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DeckListComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DeckListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show loading', () => {
      fixture.detectChanges();
      const loading = fixture.nativeElement.querySelector(
        '[data-testId]="loading"',
      );

      expect(loading).toBeTruthy();
    });
    it('should show error message if decks fail to load', () => {
      component.decks$ = throwError(() => new Error('Server error'));

      fixture.detectChanges();

      const errorEl = fixture.nativeElement.querySelector(
        '[data-testId]="error-msg"',
      );

      expect(errorEl).toBeTruthy();
      expect(errorEl.textContent).toContain('Failed to load decks');
    });
  });
});
