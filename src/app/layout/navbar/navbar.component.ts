import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleService } from '../../utils/theme-toggle.service';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  themeService = inject(ThemeToggleService)
  theme$ = this.themeService.theme
  toggleTheme() {
    this.themeService.toggleTheme()
  }
}
