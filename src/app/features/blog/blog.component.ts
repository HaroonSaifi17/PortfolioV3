import {
  afterRender,
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { BlogService } from '../../utils/blog.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent {
  BlogService = inject(BlogService);
  ActivatedRoute = inject(ActivatedRoute);
  blogContent$ = new Observable<string>();
  elementRef = inject(ElementRef);
  blogInfo$ = this.ActivatedRoute.data;
  meta = inject(Meta);
  title = inject(Title);
  renderer = inject(Renderer2);
  router = inject(Router);
  constructor() {
    this.ActivatedRoute.url.subscribe((url) => {
      this.blogContent$ = this.BlogService.getBlogContent(url[0].path);
    });
    this.blogInfo$.subscribe((data) => {
      this.title.setTitle(`${data['title']} | Haroon's Blog`);
      const url: string = this.router.url[0] || '';
      const blogUrl = `https://haroonsaifi.tech/blog/${url}`;

      this.meta.addTags([
        {
          name: 'description',
          content: data['description'],
        },
        {
          name: 'keywords',
          content: data['keywords'],
        },
        {
          name: 'author',
          content: 'Haroon',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },

        {
          property: 'og:title',
          content: data['title'],
        },
        {
          property: 'og:description',
          content: data['description'],
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:url',
          content: blogUrl,
        },
        {
          property: 'og:site_name',
          content: "Haroon's Blog",
        },
        {
          property: 'article:author',
          content: 'Haroon',
        },
        {
          property: 'article:published_time',
          content: data['date'],
        },

        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:site',
          content: '@HaroonSaifi17',
        },
        {
          name: 'twitter:title',
          content: data['title'],
        },
        {
          name: 'twitter:description',
          content: data['description'],
        },
        {
          name: 'twitter:creator',
          content: '@HaroonSaifi17',
        },
        {
          name: 'canonical',
          content: blogUrl,
        },
      ]);
    });
    afterRender(() => {
      const copyButtons =
        this.elementRef.nativeElement.querySelectorAll('.copy-button');
      copyButtons.forEach((button: HTMLSpanElement) => {
        this.renderer.listen(button, 'click', () => {
          this.copyToClipboard(
            button.parentElement!.querySelector('code')!.innerText as string,
          );
        });
      });
    });
  }
  copyToClipboard(code: string) {
    navigator.clipboard.writeText(code);
  }
  formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(
      date,
    );
    let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      date,
    );
    const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
      date,
    );
    return `${day} ${month}, ${year}`;
  }
}
