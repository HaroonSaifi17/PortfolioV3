import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as marked from 'marked';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogContent: { [key: string]: Observable<string> } = {};
  http = inject(HttpClient);

  getBlogContent(path: string): Observable<string> {
    if (!this.blogContent[path]) {
      this.blogContent[path] = this.http
        .get(`/blog/${path}.md`, { responseType: 'text' })
        .pipe(
          map((data: string) => marked.parse(data).toString())
        );
    }
    return this.blogContent[path];
  }
}
