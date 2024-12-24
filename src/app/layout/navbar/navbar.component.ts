import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { ThemeToggleService } from '../../utils/theme-toggle.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  themeService = inject(ThemeToggleService);
  theme$ = this.themeService.theme;
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  router = inject(Router);
  navWidth$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event: NavigationEnd) => {
      if (event.url === '/') return 1200;
      if (event.url.startsWith('/blog')) return 900;
      return 1200;
    }),
  );
}
