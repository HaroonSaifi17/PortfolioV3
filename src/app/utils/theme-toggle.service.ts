import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject, } from 'rxjs';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeToggleService {
  theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.Dark);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.theme.next((localStorage.getItem('theme') as Theme) || Theme.Dark);
    } else {
      afterNextRender(() => {
        this.theme.next(
          (localStorage.getItem('theme') as Theme) || Theme.Dark,
        );
      });
    }
  }

  toggleTheme(): void {
    this.theme.next(
      this.theme.value === Theme.Light ? Theme.Dark : Theme.Light,
    );
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.theme.value);
    }
  }
}
