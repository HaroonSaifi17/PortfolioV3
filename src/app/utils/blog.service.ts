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
  blogContent: { [key: string]: string } = {};
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
    return new Observable((observer) => {
      if (this.blogContent[path]) {
        observer.next(this.blogContent[path]);
        observer.complete();
      } else {
        this.http
          .get(`/blog/${path}.md`, { responseType: 'text' })
          .pipe(
            map((data: string) =>
              this.addCopyButtonToCodeBlocks(this.marked.parse(data).toString()),
            ),
          )
          .subscribe((data) => {
            this.blogContent[path] = data;
            observer.next(data);
            observer.complete();
          });
      }
    })
  }

  addCopyButtonToCodeBlocks(htmlContent: string): string {
    return htmlContent.replace(
      /<pre(?:\s[^>]*)?>\s*<code(?:\s[^>]*)?>(.*?)<\/code>\s*<\/pre>/gs,
      (match, _codeContent) => {
        const copyButtonHtml = `
        <span class="copy_button">
          <i class="pi pi-copy"></i>
        </span>
      `;
        return `<div class="code">${match}${copyButtonHtml}</div>`;
      },
    );
  }
  cacheBlogContent(path: string): void {
    if (!this.blogContent[path]) {
      this.http
        .get(`/blog/${path}.md`, { responseType: 'text' })
        .pipe(
          map((data: string) =>
            this.addCopyButtonToCodeBlocks(this.marked.parse(data).toString()),
          ),
        )
        .subscribe((data) => {
          this.blogContent[path] = data;
        });
    }
  }
}
