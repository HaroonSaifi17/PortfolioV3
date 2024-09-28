import {
  AfterViewInit,
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
export class BlogComponent implements AfterViewInit {
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
  }
  ngAfterViewInit(): void {
    const codeBlocks: HTMLElement[] =
      this.elementRef.nativeElement.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock: HTMLElement) => {
      const piCopy = this.renderer.createElement('i');
      this.renderer.addClass(piCopy, 'pi');
      this.renderer.addClass(piCopy, 'pi-copy');
      const button = this.renderer.createElement('a');
      this.renderer.appendChild(button, piCopy);
      this.renderer.addClass(button, 'copy-button');

      this.renderer.listen(button, 'click', () => {
        this.copyToClipboard(codeBlock.innerText);
        piCopy.classList.remove('pi-copy');
        piCopy.classList.add('pi-check');
        setTimeout(() => {
          piCopy.classList.remove('pi-check');
          piCopy.classList.add('pi-copy');
        }, 2000);
      });

      this.renderer.appendChild(codeBlock.parentElement, button);
    });
  }

  copyToClipboard(code: string) {
    navigator.clipboard.writeText(code);
  }
}
