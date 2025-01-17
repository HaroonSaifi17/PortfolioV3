import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../layout/hero/hero.component';
import { AboutComponent } from '../../layout/about/about.component';
import { ProjectsComponent } from '../../layout/projects/projects.component';
import { BlogService } from '../../utils/blog.service';
import { TruncatePipe } from '../../utils/truncate.pipe';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CommonModule,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    TruncatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = inject(Title);
  meta = inject(Meta);
  blogService = inject(BlogService);
  blogInfo = [
    {
      path: 'frontends-are-changing-too-fast',
      title: "Isn't Frontend libraries changing too fast? The hidden truth",
      date: '2024-09-27',
    },
    {
      path: 'i-tried-azure-web-app-and-its-frustrating',
      title: "I tried Azure Web App, and it's frustrating",
      date: '2024-11-03',
    },

    {
      path: 'angular-19-zoneless-change-detection-guide',
      title:
        'How to Implement Zoneless Change Detection in Angular 19: Performance Guide',

      date: '2024-12-25',
    },
  ];
  constructor() {
    this.title.setTitle('Mohd Haroon | Full-Stack Developer');

    this.meta.addTags([
      {
        name: 'description',
        content:
          'Full-stack developer portfolio of Mohd Haroon, showcasing expertise in Angular, Node.js, React, MongoDB, and modern web development. View my projects, skills, and professional experience.',
      },
      {
        name: 'keywords',
        content:
          'Freelance Angular Developer in Delhi, Angular 19 Developer for Scalable Web Apps, Tailored Angular Material Components Developer, 3D Web Design with Angular and Three.js, SEO-Optimized Angular SSR Expert',
      },
      {
        name: 'author',
        content: 'Mohd Haroon',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        property: 'og:title',
        content: 'Mohd Haroon | Full-Stack Developer Portfolio',
      },
      {
        property: 'og:description',
        content:
          'Explore my full-stack development portfolio featuring projects in Angular, Node.js, React, and more. See how I can help bring your web development projects to life.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://haroonsaifi.tech',
      },
      {
        property: 'og:site_name',
        content: 'Mohd Haroon Portfolio',
      },
      {
        name: 'twitter:site',
        content: '@HaroonSaifi17_',
      },
      {
        name: 'twitter:title',
        content: 'Mohd Haroon | Full-Stack Developer Portfolio',
      },
      {
        name: 'twitter:description',
        content:
          'Full-stack developer specializing in Angular, Node.js, and modern web technologies. Check out my latest projects and development expertise.',
      },
      {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=utf-8',
      },
      {
        name: 'canonical',
        content: 'https://haroonsaifi.tech',
      },
    ]);
  }
  formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(
      date,
    );
    let month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      date,
    );
    const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
      date,
    );
    return `${day} ${month}, ${year}`;
  }
  prefetch(path: string) {
    this.blogService.cacheBlogContent(path);
  }
}
