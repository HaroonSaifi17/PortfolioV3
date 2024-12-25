## Why Should You Care About Zoneless Angular?

Angular 19 makes your apps faster - much faster. By removing Zone.js, your app can run up to 40% quicker. Think of Zone.js as a watchdog that constantly checks for changes in your app. Now, we can tell Angular exactly when to check for updates, making everything smoother.

![Angular 19 New Features](/images/angular-19-thumbnail.webp)
_Angular 19 brings game-changing performance improvements_

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
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

export const appConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), // This is the secret sauce!
    provideRouter(routes),
    provideClientHydration(),
  ],
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

_Your console should show undefined for the Zone object_

## Making Things Change with Signals

Signals are Angular's new way of handling updates. They're like smart variables that tell Angular when something changes. Here's a simple example:

```typescript
import { Component, signal } from "@angular/core";

@Component({
  selector: "app-counter",
  template: `
    <h2>Count: {{ count() }}</h2>
    <button (click)="increment()">Add One</button>
  `,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((n) => n + 1);
  }
}
```

## Signals Quick Start

Signals are wrappers around values that notify Angular when they change. Here's what you need to know:

### Basic Signal Usage

```typescript
@Component({
  selector: "app-counter",
  template: `
    <h2>Count: {{ count() }}</h2>
    <button (click)="increment()">+1</button>
  `,
})
export class CounterComponent {
  count = signal(0);
  increment() {
    this.count.update((n) => n + 1);
  }
}
```

### Computed Values

```typescript
@Component({
  template: `<p>Total: ${{ total() }}</p>`
})
export class PriceComponent {
  price = signal(10);
  quantity = signal(2);
  total = computed(() => this.price() * this.quantity());
}
```

### Effects for Side Effects

```typescript
export class ThemeComponent {
  theme = signal("light");

  constructor() {
    effect(() => {
      document.body.classList.toggle("dark", this.theme() === "dark");
    });
  }
}
```

### RxJS Integration

```typescript
@Component({
  template: `<p>Time: {{ time() }}</p>`,
})
export class ClockComponent {
  time = toSignal(interval(1000), { initialValue: 0 });
}
```

## Tips for Success

- Use signals for values that change over time
- Prefer computed() for derived values
- Use effects sparingly, mainly for side effects
- Remember: signals are synchronous

## Want to Learn More?

- Check out the [official Angular Signals guide](https://angular.dev/guide/signals)
- Join the [Angular Discord community](https://discord.gg/angular)

## Next Steps

Now that you're running zoneless, explore Signals and start building faster apps! Keep an eye on our blog for more Angular tips and tricks.

_Last updated: December, 2024_

---

**Tags**: #Angular19 #WebDevelopment #JavaScript #Performance #Frontend
