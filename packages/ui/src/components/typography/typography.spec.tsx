import { screen } from '@testing-library/react';

import { render } from '@/utils/tests';

import { Typography } from './typography';

describe('Button', () => {
  it('displays text provided as the `children` prop', () => {
    const text = 'Some text';

    render(<Typography>{text}</Typography>);

    const typography = screen.getByText(text);

    expect(typography).toBeInTheDocument();
  });

  it('renders HTMl element provided as the `as` prop (div by default)', () => {
    const text = 'Some text';

    const { rerender } = render(<Typography>{text}</Typography>);

    let typography = screen.getByText(text);

    expect(typography).toBeInstanceOf(HTMLDivElement);

    rerender(<Typography as="span">{text}</Typography>);

    typography = screen.getByText(text);

    expect(typography).toBeInstanceOf(HTMLSpanElement);

    rerender(<Typography as="h1">{text}</Typography>);

    typography = screen.getByRole('heading');

    expect(typography).toBeInstanceOf(HTMLHeadingElement);
  });
});
