import { JSXElementConstructor, ReactElement } from 'react';
import { Queries, queries, render, RenderOptions, RenderResult } from '@testing-library/react';

import { ThemeProvider } from '@ccms/ui';

import { I18nProviderMock } from './lib';

type WrapperElement = JSXElementConstructor<{ children: ReactElement }>;

const AllTheProviders: WrapperElement = ({ children }) => (
  <ThemeProvider>
    <I18nProviderMock>{children}</I18nProviderMock>
  </ThemeProvider>
);

export function customRender<
  CustomQueries extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement
>(ui: ReactElement, options?: RenderOptions<CustomQueries, Container>): RenderResult<CustomQueries, Container> {
  let wrapper: WrapperElement = AllTheProviders;

  if (options?.wrapper) {
    const Wrapper = wrapper;

    wrapper = ({ children }) => (
      <AllTheProviders>
        <Wrapper>{children}</Wrapper>
      </AllTheProviders>
    );
  }

  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
