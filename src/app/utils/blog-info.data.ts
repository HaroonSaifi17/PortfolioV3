import { BlogInfo } from './blog-info.interface';

export const blogInfo: BlogInfo[] = [
  {
    path: 'frontends-are-changing-too-fast',
    data: {
      title: "Isn't Frontend libraries changing too fast?",
      description:
        'A concise look at the challenges developers face with constant updates in frontend frameworks, with an example using Angular Signals.',
      date: '2024-09-27',
      keywords: [
        'Frontend',
        'Framework Updates',
        'Angular',
        'Signals',
      ],
    },
  },
  {
    path: 'tech-companies-are-ruining-our-lives',
    data: {
      title: 'Tech companies are ruining our lives',
      description:
        'A brief look at the impact of tech companies on our lives and how they fooling us',
      date: '2024-09-28',
      keywords: [
        'Hackethon',
        'Impact',
        'Hiring',
      ],
    },
  },
  {
    path: 'how-to-setup-zoneless-angular-project',
    data: {
      title: 'How to setup zoneless Angular project',
      description:
        'A step-by-step guide to setting up a zoneless Angular project',
      date: '2024-09-29',
      keywords: [
        'Angular',
        'Zoneless',
        'Project Setup',
      ],
    },
  }
];
