import { BlogInfo } from './blog-info.interface';

export const blogInfo: BlogInfo[] = [
  {
    path: 'navigating-frequent-framework-updates',
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
    path: 'second-post',
    data: {
      title: 'Second Post',
      keywords: ['second', 'post'],
      description: 'This is the second post',
      date: '2020-01-02',
    },
  },
];
