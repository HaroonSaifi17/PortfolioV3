import { Component, Inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBlog,
  faHome,
  faInfoCircle,
  faPaperclip,
  faProjectDiagram,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  faHome = faHome;
  faAbout = faInfoCircle;
  faContact = faPaperclip;
  fablog = faBlog;
  faProjects = faProjectDiagram;
  isCollapsed = signal(false);
  activeFragment = signal('');
  isAnimating = false;
  constructor(private router: Router) {}
  navClick(f: HTMLUListElement) {
    if (this.isAnimating || window.innerWidth > 640) return;
    this.isAnimating = true;

    this.activeFragment.set('');
    this.isCollapsed.set(!this.isCollapsed());
    if (this.isCollapsed()) {
      f.style.display = 'flex';
      f.classList.add('animateIn');
      f.classList.remove('animateOut');

      f.addEventListener(
        'animationend',
        () => {
          this.isAnimating = false;
        },
        { once: true }
      );
    } else {
      f.classList.add('animateOut');
      f.classList.remove('animateIn');

      f.addEventListener(
        'animationend',
        () => {
          f.style.display = 'none';
          this.isAnimating = false;
        },
        { once: true }
      );
    }
  }
  navigate(fregment: string): void {
    this.router.navigateByUrl('' + fregment);
    this.activeFragment.set(fregment);
    if ( window.innerWidth > 640) return;
    this.isCollapsed.set(false);
  }
}
