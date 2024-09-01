import { Component, inject } from '@angular/core';
import { BlogService } from '../../utils/blog.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  BlogService = inject(BlogService);
  ActivatedRoute = inject(ActivatedRoute);
  blogInfo = this.ActivatedRoute.data.pipe(map(data => data));
  blogContent = this.BlogService.getBlogContent(this.ActivatedRoute.url.subscribe(url=>{
    return url.[0].path;
  }));
}
