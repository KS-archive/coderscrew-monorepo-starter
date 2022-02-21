import type { LoadableComponent } from '@loadable/component';

export class RoutePath {
  constructor(private readonly path: string, private readonly element: LoadableComponent<unknown>) {}

  get url() {
    return this.path;
  }

  async preload() {
    this.element.preload();
  }
}
