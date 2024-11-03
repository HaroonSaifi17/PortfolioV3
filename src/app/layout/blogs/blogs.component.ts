import { Component } from '@angular/core';
import { blogInfo } from '../../utils/blog-info.data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  blogInfo = blogInfo;
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
