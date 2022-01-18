import { createRef } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '@/utils/tests';

import { Button } from './button';

describe('Button', () => {
  it('has button role and a11y name that equals its content', () => {
    const buttonText = 'Button text';

    render(<Button>{buttonText}</Button>);

    const button = screen.getByRole('button', { name: buttonText });

    expect(button).toBeInTheDocument();
  });

  it('calls function passed to `onClick` with button element event', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} />);

    expect(handleClick).toHaveBeenCalledTimes(0);

    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(handleClick.mock.calls[0][0].target).toBeInstanceOf(HTMLButtonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('passes ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
