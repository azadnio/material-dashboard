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
        loadComponent: () => import('./pages/content/content'),
        children: [
            {
                path: 'articles',
                loadComponent: () => import('./pages/content/articles/articles')
            },
            {
                path: 'categories',
                loadComponent: () => import('./pages/content/categories/categories')
            },
            {
                path: 'tags',
                loadComponent: () => import('./pages/content/tags/tags'),                
            }
        ]
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
