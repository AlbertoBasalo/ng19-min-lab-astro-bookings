import { Routes } from '@angular/router';
import { HomePage } from './routes/home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'about',
    loadComponent: () => import('./routes/about/about.page'),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./routes/auth/login/login.page'),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./routes/auth/register/register.page'),
  },
  {
    path: 'launches/:id',
    loadComponent: () => import('./routes/launches/launch-details/launch-details.page'),
  },
];
