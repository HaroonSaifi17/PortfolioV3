import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { blogInfo } from '../../utils/blog-info.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = inject(Title);
  meta = inject(Meta);
  blogInfo = blogInfo;
  constructor() {
    this.title.setTitle('Portfolio');

    this.meta.addTags([
      {
        name: 'description',
        content:
          'Full-stack developer portfolio showcasing skills in front-end and back-end development, including projects using Angular, Node.js, and more.',
      },
      {
        name: 'keywords',
        content:
          'full-stack developer, portfolio, Angular, Node.js, JavaScript, web development, front-end, back-end, Express, MongoDB, SQL',
      },
      { name: 'author', content: 'Mohd Haroon' },
    ]);
  }
}
