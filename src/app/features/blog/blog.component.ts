import {
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import { BlogService } from '../../utils/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  BlogService = inject(BlogService);
  ActivatedRoute = inject(ActivatedRoute);
  blogContent$ = new Observable<string>();
  elementRef = inject(ElementRef);
  constructor() {
    this.ActivatedRoute.url.subscribe((url) => {
      this.blogContent$ = this.BlogService.getBlogContent(url[0].path);
    });
    this.blogContent$.subscribe((content) => {
      this.elementRef.nativeElement.innerHTML = content;
    });
  }
}
