import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { blogInfo } from '../../utils/blog-info.data';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../layout/hero/hero.component';
import { AboutComponent } from '../../layout/about/about.component';
import { ProjectsComponent } from '../../layout/projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = inject(Title);
  meta = inject(Meta);
  blogInfo = blogInfo;
  constructor() {
    this.title.setTitle('Mohd Haroon | Full-Stack Developer Portfolio');

    this.meta.addTags([
      {
        name: 'description',
        content:
          'Full-stack developer portfolio of Mohd Haroon, showcasing expertise in Angular, Node.js, React, MongoDB, and modern web development. View my projects, skills, and professional experience.',
      },
      {
        name: 'keywords',
        content:
          'full-stack developer, Mohd Haroon, HaroonSaifi17, Angular developer, Node.js developer, React developer, JavaScript expert, web development, front-end development, back-end development, MongoDB, Express.js, SQL, REST API, portfolio, software engineer',
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
        name: 'twitter:card',
        content: 'summary_large_image',
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
}
