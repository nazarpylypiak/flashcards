import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MatDialog } from '@angular/material/dialog';
import { MemoizedSelector } from '@ngrx/store';
import {
  selectAllDecks,
  selectError,
  selectLoading,
} from '@store/selectors/deck.selectors';
import { initialDeckState } from '@store/state/deck.state';
import { of } from 'rxjs';
import { Deck } from '../../../shared/models/deck.model';
import { DeckListComponent } from './deck-list.component';

describe('DeckListComponent', () => {
  let component: DeckListComponent;
  let fixture: ComponentFixture<DeckListComponent>;
  let store: MockStore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSelectAllDecks: MemoizedSelector<any, Deck[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckListComponent],
      providers: [
        provideMockStore({
          initialState: {
            deck: initialDeckState,
          },
        }),
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn().mockReturnValue({
              afterClosed: () => of(null),
            }),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockSelectAllDecks = store.overrideSelector(selectAllDecks, []);
    fixture = TestBed.createComponent(DeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display "no decks" message when decks are empty', () => {
    mockSelectAllDecks.setResult([]);
    store.refreshState();
    fixture.detectChanges();

    const messageEl = fixture.nativeElement.querySelector(
      '[data-testId="empty-decks"]',
    );
    expect(messageEl.textContent).toContain('No decks');
  });

  it('should display correct name of deck', () => {
    const deck = { id: '0', name: 'Deck name' } as Deck;
    mockSelectAllDecks.setResult([deck]);
    store.refreshState();
    fixture.detectChanges();

    const name = fixture.nativeElement.querySelector(
      `[data-testId="deck-name-${deck.id}"]`,
    );
    expect(name.textContent).toContain('Deck name');
  });

  it('should display all decks when decks array has items', () => {
    mockSelectAllDecks.setResult([
      { id: '0', name: 'Deck name' } as Deck,
      { id: '1', name: 'Deck name 1' } as Deck,
    ]);
    store.refreshState();
    fixture.detectChanges();

    const deckCard = fixture.nativeElement.querySelectorAll(
      '[data-testId^="deck-card-"]',
    );
    expect(deckCard).toHaveLength(2);
  });

  // it('should show correct number of decks items', () => {
  //   mockSelectAllDecks.setResult([
  //     { id: '0', name: 'Deck name' } as Deck,
  //     { id: '1', name: 'Deck name 1' } as Deck,
  //   ]);
  //   store.refreshState();
  //   fixture.detectChanges();

  //   const deckCardCount = fixture.nativeElement.querySelector(
  //     '[data-testId="deck-card-count"]',
  //   );
  //   expect(deckCardCount.textContent).toBe(2);
  // });

  it('should call editDeck when edit button clicked', () => {
    const deck = { id: '0', name: 'Deck name' } as Deck;
    jest.spyOn(component, 'editDeck');

    mockSelectAllDecks.setResult([deck]);
    store.overrideSelector(selectLoading, false);
    store.refreshState();
    fixture.detectChanges();

    const editDeck: HTMLButtonElement = fixture.nativeElement.querySelector(
      `[data-testId="edit-btn-${deck.id}"]`,
    );
    editDeck.click();
    fixture.detectChanges();

    expect(component.editDeck).toHaveBeenCalledWith(deck);
  });

  it('should call deleteDeck when delete button clicked', () => {
    const deck = { id: '0', name: 'Deck name' } as Deck;
    const deck1 = { id: '1', name: 'Deck name 1' } as Deck;
    jest.spyOn(component, 'deleteDeck');
    mockSelectAllDecks.setResult([deck, deck1]);
    store.refreshState();
    fixture.detectChanges();

    const editButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      `[data-testId="delete-btn-${deck.id}"]`,
    );
    editButton.click();
    fixture.detectChanges();

    const deckEl = fixture.nativeElement.querySelector(
      `[data-testId="deck-card-${deck.id}]`,
    );

    expect(component.deleteDeck).toHaveBeenCalled();
    expect(deckEl).toBeNull();
  });

  it('should navigate to deck details on click', () => {
    const deck = { id: '0', name: 'Deck name' } as Deck;

    jest.spyOn(component, 'deckClick');

    mockSelectAllDecks.setResult([deck]);
    store.refreshState();
    fixture.detectChanges();

    const deckCard = fixture.nativeElement.querySelector(
      `[data-testId="deck-card-${deck.id}"]`,
    );
    deckCard.click();
    fixture.detectChanges();
    expect(component.deckClick).toHaveBeenCalledWith(deck);
  });

  it('should show loading', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();
    const loading = fixture.nativeElement.querySelector(
      '[data-testId="loading"]',
    );

    expect(loading).toBeTruthy();
  });

  it('should show error message if decks fail to load', async () => {
    const errorMessage = 'Failed to load decks';

    store.overrideSelector(selectError, errorMessage);
    store.refreshState();
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector(
      '[data-testId="error-msg"]',
    );
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain(errorMessage);
  });
});
