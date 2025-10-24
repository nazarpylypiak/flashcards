import { ComponentFixture, TestBed } from '@angular/core/testing';
import { appInitialState, AppState } from '@core/store/state/app.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CreateDeckComponent } from './create-deck.component';

describe('CreateDeckComponent', () => {
  let component: CreateDeckComponent;
  let fixture: ComponentFixture<CreateDeckComponent>;
  let store: MockStore<AppState>;
  const initialState = appInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDeckComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
