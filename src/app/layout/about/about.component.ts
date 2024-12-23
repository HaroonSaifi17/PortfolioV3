import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    imports: [],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {
  downloadResume() {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Resume_Mohd_Haroon.pdf';
    link.click();
  }
}
