import { Component } from '@angular/core';

interface Project {
  timeAgo: string;
  link: string;
  title: string;
  description: string;
  tags: string[];
}

@Component({
    selector: 'app-projects',
    imports: [],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      timeAgo: '12 month ago',
      link: 'https://prepzone.tech',
      title: 'PrepZone',
      description:
        'Developed a comprehensive platform for competitive exam preparation with practice tests and instant results',
      tags: ['Angular', 'Express'],
    },
    {
      timeAgo: '8 month ago',
      link: 'https://sketchomes.com',
      title: 'Sketchomes',
      description:
        'Built a professional interior design website featuring projects with an interactive 3D photosphere.',
      tags: ['Angular', 'Tailwind css'],
    },
    {
      timeAgo: '6 month ago',
      link: 'https://gfg-adgips.vercel.app/',
      title: 'GeeksforGeeks',
      description:
        'Developed a visually appealing website for the college society "GeeksforGeeks Chapter ADGIPS".',
      tags: ['ReactJs', 'NodeJs'],
    },
    {
      timeAgo: '9 month ago',
      link: 'https://hack-n-chill.vercel.app/',
      title: 'HackNChill',
      description:
        'Created a dynamic hackathon website with a Netflix-inspired UI design and based on Squid Game theme.',
      tags: ['ReactJs'],
    },
    {
      timeAgo: '3 month ago',
      link: 'https://github.com/HaroonSaifi17/snake-game',
      title: 'Snake Game',
      description:
        'Developed a terminal-based Snake game with a personal portfolio site for showcasing projects.',
      tags: ['Rust'],
    },
  ];
}
