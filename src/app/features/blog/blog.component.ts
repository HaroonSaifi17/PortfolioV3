import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { BlogService } from '../../utils/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

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
  blogInfo$ = this.ActivatedRoute.data
  constructor() {
    this.ActivatedRoute.url.subscribe((url) => {
      this.blogContent$ = this.BlogService.getBlogContent(url[0].path);
    });
    this.ActivatedRoute.data.subscribe((data) => {
     console.log(data);
    });
  }
}
