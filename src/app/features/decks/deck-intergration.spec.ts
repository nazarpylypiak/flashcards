import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DeckListComponent } from '@features/decks/deck-list/deck-list.component';
import { Deck } from '@models/deck.model';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TopBarComponent } from '@shared/containers/top-bar/top-bar.component';
import { addDeck } from '@store/actions/deck.actions';
import { selectAllDecks } from '@store/selectors/deck.selectors';
import { appInitialState, AppState } from '@store/state/app.state';
import { of } from 'rxjs';

@Component({
  imports: [TopBarComponent, DeckListComponent],
  template: `
    <app-top-bar></app-top-bar>
    <app-deck-list></app-deck-list>
  `,
})
class TestHostComponent {}

describe('Deck Intergration: TopBar -> DeckList', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let store: MockStore<AppState>;
  let dialog: MatDialog;
  const initialState = appInitialState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSelectAllDecks: MemoizedSelector<any, Deck[]>;

  const deck = { id: '0', name: 'New deck' } as Deck;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn(() => ({
              afterClosed: () => of(deck),
            })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    store = TestBed.inject(MockStore);
    mockSelectAllDecks = store.overrideSelector(selectAllDecks, []);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should add deck when TopBar button clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const addDeckBtn = fixture.nativeElement.querySelector(
      '[data-testId="add-deck"]',
    );
    addDeckBtn.click();
    fixture.detectChanges();

    expect(dialog.open).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(addDeck({ deck }));

    mockSelectAllDecks.setResult([deck]);
    store.refreshState();
    fixture.detectChanges();

    const deckEls = fixture.nativeElement.querySelectorAll(
      '[data-testId^="deck-card-"]',
    );
    expect(deckEls).toHaveLength(1);
    expect(deckEls[0].textContent).toContain('New deck');
  });
});
