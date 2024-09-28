import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marked } from 'marked';
import hljs from 'highlight.js';
import { markedHighlight } from 'marked-highlight';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogContent: { [key: string]: Observable<string> } = {};
  http = inject(HttpClient);
  marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, _info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    }),
  );

  constructor() {}
  getBlogContent(path: string): Observable<string> {
    if (this.blogContent[path]===undefined) {
      this.blogContent[path] = this.http
        .get(`/blog/${path}.md`, { responseType: 'text' })
        .pipe(map((data: string) => this.marked.parse(data).toString()));
    }
    return this.blogContent[path];
  }
}
