import { Route } from '@angular/router';

export interface BlogInfo extends Route {
  data: {
    title: string;
    description: string;
    date: string;
    keywords?: string[];
  };
}
