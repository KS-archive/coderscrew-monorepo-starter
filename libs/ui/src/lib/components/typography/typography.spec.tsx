import { createRef } from 'react';

import { render, screen } from '../../../utils/tests';
import { Typography } from './typography';

describe('Typography', () => {
  it('displays text provided as the `children` prop', () => {
    const text = 'Some text';

    render(<Typography>{text}</Typography>);

    const typography = screen.getByText(text);

    expect(typography).toBeInTheDocument();
  });

  it('renders HTML element provided in the `as` prop and passes a correct ref to it', () => {
    const divRef = createRef<HTMLDivElement>();

    const { rerender } = render(<Typography ref={divRef} />);

    expect(divRef.current).toBeInstanceOf(HTMLDivElement);

    const paragraphRef = createRef<HTMLParagraphElement>();

    rerender(<Typography as="p" ref={paragraphRef} />);

    expect(paragraphRef.current).toBeInstanceOf(HTMLParagraphElement);
  });
});
