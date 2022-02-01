import type { ReactElement } from 'react';

export class RoutePath {
  readonly preload: () => Promise<void>;

  readonly url: string;

  constructor(path: string, element: () => Promise<ReactElement>) {
    this.url = path;
    this.preload = async () => {
      await element();
    };
  }
}
