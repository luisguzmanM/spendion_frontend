import { Route } from '@angular/router';

export const ROUTES : Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  }
];