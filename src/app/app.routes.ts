import { Route } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'decks',
        loadComponent: () =>
          import('./features/decks/deck-list/deck-list.component').then(
            (m) => m.DeckListComponent,
          ),
      },
      {
        path: 'decks/create-deck',
        loadComponent: () =>
          import('./features/decks/create-deck/create-deck.component').then(
            (m) => m.CreateDeckComponent,
          ),
      },
      {
        path: 'decks/:id',
        loadComponent: () =>
          import('./features/decks/deck-detail/deck-detail.component').then(
            (m) => m.DeckDetailComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'decks',
        pathMatch: 'full',
      },
    ],
  },
];
