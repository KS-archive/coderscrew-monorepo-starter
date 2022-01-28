import { createRef } from 'react';
import { screen } from '@testing-library/react';

import { render } from '@/utils/tests';

import { Link } from './link';

describe('Link', () => {
  it('displays text provided as the `children` prop', () => {
    const text = 'Some text';

    render(<Link href="#id">{text}</Link>);

    const link = screen.getByText(text);

    expect(link).toBeInTheDocument();
  });

  /* eslint-disable jsx-a11y/anchor-is-valid */
  it('renders HTML element provided in the `as` prop and passes a correct ref to it', () => {
    const anchorRef = createRef<HTMLAnchorElement>();

    const { rerender } = render(<Link ref={anchorRef} />);

    expect(anchorRef.current).toBeInstanceOf(HTMLAnchorElement);

    const divRef = createRef<HTMLDivElement>();

    rerender(<Link as="div" ref={divRef} />);

    expect(divRef.current).toBeInstanceOf(HTMLDivElement);
  });
  /* eslint-enable jsx-a11y/anchor-is-valid */
});
