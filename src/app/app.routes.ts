import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'spaced-repetition',
    loadComponent: () =>
      import('./spaced-repetition/spaced-repetition.component').then(
        (m) => m.SpacedRepetitionComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
