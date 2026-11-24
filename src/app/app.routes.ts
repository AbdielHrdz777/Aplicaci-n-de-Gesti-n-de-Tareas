import { Routes } from '@angular/router';

export const routes: Routes = [
  // Cambia esto dependiendo de dónde esté tu home:
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'tarea',
    loadComponent: () => import('./pages/tarea/tarea.page').then((m) => m.TareaPage),
  },
  {
    path: 'tarea-detalles/:id',
    loadComponent: () => import('./pages/tarea-detalles/tarea-detalles.page').then((m) => m.TareaDetallesPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
