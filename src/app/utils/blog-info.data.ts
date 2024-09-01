import { BlogInfo } from './blog-info.interface';

export const blogInfo: BlogInfo[] = [
  {
    path: 'first-post',
    data: {
      title: 'First Post',
      description: 'This is the first post',
      date: '2020-01-01',
    },
  },
  {
    path: 'second-post',
    data: {
      title: 'Second Post',
      description: 'This is the second post',
      date: '2020-01-02',
    },
  }
];
