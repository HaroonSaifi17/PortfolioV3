import { Routes } from '@angular/router';
import { blogInfo } from './utils/blog-info.data';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blog',
    children: blogInfo.map((blog) => ({
      loadComponent: () =>
        import('./features/blog/blog.component').then((m) => m.BlogComponent),
      ...blog,
    })),
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./layout/blogs/blogs.component').then((m) => m.BlogsComponent),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./layout/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
