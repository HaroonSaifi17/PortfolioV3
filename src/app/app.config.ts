import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BlogService } from './utils/blog.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: BlogService ,
      useFactory: () => {
        const blogService = new BlogService();
        return blogService;
      },
    },
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
};
