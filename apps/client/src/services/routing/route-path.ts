import type { ReactElement } from 'react';

export class RoutePath {
  constructor(private readonly path: string, private readonly element: () => Promise<ReactElement>) {}

  get url() {
    return this.path;
  }

  async preload() {
    await this.element();
  }
}
