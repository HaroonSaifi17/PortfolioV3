## Introduction 

zone.js is a library that helps track changes across asynchronous operations, like HTTP requests or event listeners, and then triggers change detection automatically. However, as Angular applications grow complex, this automatic change detection can result in unnecessary re-renders and performance bottlenecks. Angular 18 introduced experimental feature , in which you can disable zone.js completely and do manual change detection or new angular use signal's. In this blog i give you the brief introduction , how to setup zoneless project and how use angular signal's for change detection, in last i show you a method to manually trigger change detection.

## Setup new project with Zoneless

1. Generate a angular project using angular cli, make sure cli version is < 18.x.x 

   ```bash
   ng new zoneless
   ```

2. Edit `app.config.ts` file and add below code

   ```typescript 
   import {
     ApplicationConfig,
     provideExperimentalZonelessChangeDetection,
   } from '@angular/core';
   import { provideRouter } from '@angular/router';
 
   import { routes } from './app.routes';
   import { provideClientHydration } from '@angular/platform-browser';
   import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
   import { provideHttpClient, withFetch } from '@angular/common/http';

   export const appConfig: ApplicationConfig = {
     providers: [
       provideExperimentalZonelessChangeDetection(), // Add this line
       provideRouter(routes),
       provideClientHydration(),
       provideAnimationsAsync(),
       provideHttpClient(withFetch()),
     ],
   };
   ```

3. Edit `angular.json` file and remove `zone.js` from polyfills 

   ```json
   "polyfills": [
   // "zone.js" // Remove this line
   ],
   ```

4. Check if zone.js is removed from project by console logging the Zone object in browser console.
