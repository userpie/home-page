import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'flashcards',
    loadComponent: () =>
      import('./flashcards/flashcards.component').then(
        (m) => m.FlashcardsComponent
      ),
  },
  {
    path: 'spaced-repetition',
    redirectTo: 'flashcards',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
