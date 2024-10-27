## Introduction 

Zone.js is a library that helps track changes across asynchronous operations, like HTTP requests or event listeners, and then triggers change detection automatically. However, as Angular applications grow complex, this automatic change detection can result in unnecessary re-renders and performance bottlenecks. Angular 18 introduced experimental feature, in which you can disable zone.js completely and do manual change detection or new angular use signal's. In this blog I give you the brief introduction, how to set up zoneless project and how use angular signal's for change detection, in last I show you a method to manually trigger change detection.

## Setup new project with Zoneless

1. Generate an angular project using angular cli, make sure cli version is < 18.x.x 

   ```bash
   ng new zoneless
   ```

2. Edit `app.config.ts` file and add below code

   ```typescript 
   providers: [
     provideExperimentalZonelessChangeDetection(), // Add this line
     provideRouter(routes),
     provideClientHydration(),
     provideAnimationsAsync(),
     provideHttpClient(withFetch()),
   ],
   ```

3. Edit `angular.json` file and remove `zone.js` from polyfills 

   ```json
   "polyfills": [
   // "zone.js" // Remove this line
   ],
   ```

4. Check if zone.js is removed from project by console logging the Zone object in browser console.
   
   ![Console log](https://haroonsaifi.tech/images/console-log.webp)


## Use Angular Signal's for Change Detection 

Angular 18 introduced new feature called Angular Signal's, which is a new way to trigger change detection in Angular. Feel free to read more about Angular Signal's in [official documentation](https://angular.dev/guide).

## Conclusion 

In this blog i give you the brief introduction of zone.js, how to set up zoneless project and how to use angular signal's for change detection. I hope you like this blog. If you have any question then feel free to ask me in email.


