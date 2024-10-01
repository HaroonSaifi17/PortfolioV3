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
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
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
  constructor() {
    this.ActivatedRoute.url.subscribe((url) => {
      this.blogContent$ = this.BlogService.getBlogContent(url[0].path);
    });
    this.blogInfo$.subscribe((data) => {
      this.title.setTitle(data['title']);
      this.meta.addTags([
        { name: 'description', content: data['description'] },
        { name: 'keywords', content: data['keywords'] },
        { name: 'author', content: 'Haroon' },
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
