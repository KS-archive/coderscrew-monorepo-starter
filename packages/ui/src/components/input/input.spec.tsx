import { createRef } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '@/utils/tests';

import { Input } from './input';

describe('Input', () => {
  it('has textbox role', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('displays passed placeholder text', () => {
    const placeholder = 'Some placeholder';

    render(<Input placeholder={placeholder} />);

    const input = screen.getByPlaceholderText(placeholder);

    expect(input).toBeInTheDocument();
  });

  it('displays passed value', () => {
    const value = 'Some value';

    render(<Input onChange={jest.fn()} value={value} />);

    const input = screen.getByDisplayValue(value);

    expect(input).toBeInTheDocument();
  });

  it('calls `onChange` with the new value when user write something', () => {
    const handleChange = jest.fn();
    const textToType = 'Hello world!';

    render(<Input onChange={handleChange} />);

    expect(handleChange).toHaveBeenCalledTimes(0);

    const input = screen.getByRole('textbox');

    userEvent.type(input, textToType);

    expect(handleChange).toHaveBeenCalledWith(textToType);
    expect(handleChange).toHaveBeenCalledTimes(textToType.length);
  });

  it('calls `onFocus` when the element gets focus and `onBlur` when it loses it', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

    expect(handleFocus).toHaveBeenCalledTimes(0);
    expect(handleBlur).toHaveBeenCalledTimes(0);

    userEvent.tab();

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(0);

    userEvent.tab();

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('passes ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
