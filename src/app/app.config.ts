import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { PreventDefaultEventPlugin } from '@core/event-manager/prevent-default-event';
import { StopPropagationEventPlugin } from '@core/event-manager/stop-propagation-event';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { DeckEffects } from './core/store/effects/deck.effects';
import { deckReducer } from './core/store/reducers/deck.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: EVENT_MANAGER_PLUGINS,
      multi: true,
      useClass: PreventDefaultEventPlugin,
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      multi: true,
      useClass: StopPropagationEventPlugin,
    },
    provideRouter(appRoutes),
    provideStore({ deck: deckReducer }),
    provideEffects([DeckEffects]),
    provideStoreDevtools({
      maxAge: 25, // Keep last 25 actions
      logOnly: environment.production,
      features: {
        pause: true,
        lock: true,
        persist: true,
      },
    }),
  ],
};
