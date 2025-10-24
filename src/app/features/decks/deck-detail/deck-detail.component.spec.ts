import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { appInitialState, AppState } from '@core/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DeckDetailComponent } from './deck-detail.component';

describe('DeckDetailComponent', () => {
  let component: DeckDetailComponent;
  let fixture: ComponentFixture<DeckDetailComponent>;
  let store: MockStore<AppState>;
  let route: ActivatedRoute;
  const initialState = appInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckDetailComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: jest.fn().mockReturnValue('123') },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckDetailComponent);

    route = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
