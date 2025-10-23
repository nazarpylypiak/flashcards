# Angular Flashcards App

A simple Flashcards / Quiz app built with Angular to practice components, forms, routing, animations, and testing. Users can create decks, add flashcards, and study them in a flip-card interface.

## Features

- Create, edit, delete Decks
- Add, edit, delete Flashcards
- Study Mode with card flipping
- Progress tracking for sessions
- Responsive UI with Angular Material
- Lazy-loaded standalone components
- Unit, integration, and e2e testing

## Tech Stack

Angular 18+, Angular Material, RxJS, standalone components, Jest/Karma, Cypress

## Project Structure

app/
├── core/ # Services, guards, interceptors
├── shared/ # Reusable components, pipes, directives
├── features/ # Decks, Flashcards, Study modules
├── app-routing.module.ts
└── app.module.ts

## Installation

git clone <repo-url>
cd flashcards-app
npm install
ng serve

Open http://localhost:4200/ in your browser.

## Testing

- Unit Tests: ng test
- E2E Tests: ng e2e

## Future Improvements

- User authentication
- Backend API persistence
- Spaced repetition algorithm
- Dark mode support
- Export/import decks as JSON

## License

MIT © Your Name
