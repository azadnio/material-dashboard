import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard')
    },
    {
        path: 'content',
        loadComponent: () => import('./pages/content/content')
    },
    {
        path: 'analytics',
        loadComponent: () => import('./pages/analytics/analytics')
    },
    {
        path: 'comments',
        loadComponent: () => import('./pages/comments/comments')
    }
];
