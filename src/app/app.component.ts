import {
  afterNextRender,
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MouseGlowDirective } from './utils/mouse-glow.directive';
import { Theme, ThemeToggleService } from './utils/theme-toggle.service';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent, NavbarComponent, MouseGlowDirective],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeToggleService);
  private readonly meta = inject(Meta);
  private readonly platformId = inject(PLATFORM_ID);
  private themeSubscription?: Subscription;

  readonly title = 'PortfolioV3';

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      this.setupThemeHandling();
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupThemeHandling();
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  private setupThemeHandling(): void {
    this.themeSubscription = this.themeService.theme.subscribe((theme) => {
      this.updateTheme(theme);
      this.updateMetaThemeColor(theme);
    });
  }

  private updateTheme(theme: Theme): void {
    const updateClassList = () => {
      if (!document.body.classList.contains(theme)) {
        document.body.classList.remove(Theme.Light, Theme.Dark);
        document.body.classList.add(theme);
      }
    };

    isPlatformBrowser(this.platformId)
      ? updateClassList()
      : afterNextRender(updateClassList);
  }

  private updateMetaThemeColor(theme: Theme): void {
    const themeColor = theme === Theme.Dark ? 'rgb(15 23 42)' : '#ffffff';
    this.meta.updateTag({ name: 'theme-color', content: themeColor });
  }
}
