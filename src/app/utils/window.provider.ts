import { InjectionToken, FactoryProvider } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('window', {
  providedIn: 'root',
   factory: () => {
    if(typeof window !== 'undefined') {
      return window
    }
    return new Window();
  }
});
