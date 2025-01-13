import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeToggleService {
  theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.Light);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.theme.next((localStorage.getItem('theme') as Theme) || Theme.Light);
    }
  }

  toggleTheme(): void {
    this.theme.next(
      this.theme.value === Theme.Light ? Theme.Dark : Theme.Light,
    );
    if (isPlatformBrowser(this.platformId)) {
      if (this.theme.value === Theme.Dark) {
        document.documentElement.classList.add(Theme.Dark);
      } else {
        document.documentElement.classList.remove(Theme.Dark);
      }
      localStorage.setItem('theme', this.theme.value);
    }
  }
}
