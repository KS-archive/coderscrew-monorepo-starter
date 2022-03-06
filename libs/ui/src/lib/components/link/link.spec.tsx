import { createRef } from 'react';

import { render, screen } from '../../../utils/tests';
import { Link } from './link';

describe('Link', () => {
  it('displays text provided as the `children` prop', () => {
    const text = 'Some text';

    render(<Link href="#id">{text}</Link>);

    const link = screen.getByText(text);

    expect(link).toBeInTheDocument();
  });

  it('renders HTML element provided in the `as` prop and passes a correct ref to it', () => {
    const anchorRef = createRef<HTMLAnchorElement>();

    const { rerender } = render(<Link ref={anchorRef} />);

    expect(anchorRef.current).toBeInstanceOf(HTMLAnchorElement);

    const divRef = createRef<HTMLDivElement>();

    rerender(<Link as="div" ref={divRef} />);

    expect(divRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
