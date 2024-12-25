# Boost Your Angular 19 App Performance with Zoneless Change Detection

![Angular 19 New Features](/images/angular-19-thumbnail.webp)
*Angular 19 brings game-changing performance improvements*

## Why Should You Care About Zoneless Angular?

Angular 19 makes your apps faster - much faster. By removing Zone.js, your app can run up to 40% quicker. Think of Zone.js as a watchdog that constantly checks for changes in your app. Now, we can tell Angular exactly when to check for updates, making everything smoother.

## Quick Setup Guide (5 Minutes)

Want better performance? Let's set up a zoneless Angular project:

1. Create a Fresh Project
```bash
ng new my-fast-app
# Choose your preferred options when prompted
```

2. Power Up Your App
Open `app.config.ts` and add the zoneless magic:
```typescript
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), // This is the secret sauce!
    provideRouter(routes),
    provideClientHydration()
  ]
};
```

3. Remove the Training Wheels
Update your `angular.json` - find the "polyfills" section and remove Zone.js:
```json
{
  "polyfills": [
    // "zone.js" is now commented out
  ]
}
```

## How to Know It Worked?

Open your browser's console (press F12) and type `window.Zone`. If you see "undefined", congratulations! You're now running Zone-free! 

![Console showing Zone.js is removed](https://haroonsaifi.tech/images/console-log.webp)

*Your console should show undefined for the Zone object*

## Making Things Change with Signals

Signals are Angular's new way of handling updates. They're like smart variables that tell Angular when something changes. Here's a simple example:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h2>Count: {{ count() }}</h2>
    <button (click)="increment()">Add One</button>
  `
})
export class CounterComponent {
  count = signal(0);
  
  increment() {
    this.count.update(n => n + 1);
  }
}
```
## New Signal APIs in Angular 19

### computed() with Equal Functions

The computed() signal now accepts a custom equality function:

```typescript
import { computed, signal } from '@angular/core';

interface User {
  id: number;
  name: string;
}

const user = signal<User>({ id: 1, name: 'John' });

const userName = computed(() => user().name, {
  equal: (a, b) => a.toLowerCase() === b.toLowerCase()
});
```

### toSignal() for RxJS Observables

Convert any Observable to a Signal easily:

```typescript
import { toSignal } from '@angular/core';
import { interval } from 'rxjs';

const counter$ = interval(1000);
const count = toSignal(counter$, { initialValue: 0 });

@Component({
  template: `
    <p>Count: {{ count() }}</p>
  `
})
export class CounterComponent {
  count = count;
}
```

### effect() for Side Effects

Handle side effects cleanly:

```typescript
import { effect, signal } from '@angular/core';

const theme = signal('light');

effect(() => {
  document.body.classList.toggle('dark-mode', theme() === 'dark');
});
```

### untracked() for Performance

Skip tracking dependencies when needed:

```typescript
import { signal, computed, untracked } from '@angular/core';

const count = signal(0);
const expensive = signal(1000);

const total = computed(() => {
  const currentCount = count();
  // expensive() won't trigger recomputation
  const untrackedValue = untracked(() => expensive());
  return currentCount + untrackedValue;
});
```

## Want to Learn More?

- Check out the [official Angular Signals guide](https://angular.dev/guide/signals)
- Join the [Angular Discord community](https://discord.gg/angular)

## Next Steps

Now that you're running zoneless, explore Signals and start building faster apps! Keep an eye on our blog for more Angular tips and tricks.

*Last updated: December, 2024*

---
**Tags**: #Angular19 #WebDevelopment #JavaScript #Performance #Frontend
