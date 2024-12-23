import { Routes } from '@angular/router';
import { blogInfo } from './utils/blog-info.data';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { BlogsComponent } from './layout/blogs/blogs.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
    component: BlogsComponent,
  },
  {
    path: 'error',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
