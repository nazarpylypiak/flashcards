import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TopBarComponent } from '@shared/containers/top-bar/top-bar.component';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let title: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, TopBarComponent, FooterComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();

    title = TestBed.inject(Title);

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
