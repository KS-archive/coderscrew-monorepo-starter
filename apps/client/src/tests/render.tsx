import { JSXElementConstructor, ReactElement } from 'react';
import { Queries, queries, render, RenderOptions, RenderResult } from '@testing-library/react';

import { ThemeProvider, ToastProvider } from '@ccms/ui';

import { RoutingProviderMock } from '@/services/routing';

type WrapperElement = JSXElementConstructor<{ children: ReactElement }>;

const AllTheProviders: WrapperElement = ({ children }) => (
  <ThemeProvider>
    <ToastProvider>
      <RoutingProviderMock routes={[]}>{children}</RoutingProviderMock>
    </ToastProvider>
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
