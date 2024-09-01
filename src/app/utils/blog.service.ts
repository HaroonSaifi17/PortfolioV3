import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as marked from 'marked';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogContent: { [key: string]: string } = {};
  http = Inject(HttpClient);

  async getBlogContent(path: string): Promise<string> {
    if (!this.blogContent[path]) {
      const content = await this.http
        .get(`/assets/blog/${path}.md`, { responseType: 'text' })
        .toPromise();
      this.blogContent[path] = await marked.parse(content);
    }
    return this.blogContent[path];
  }
}
