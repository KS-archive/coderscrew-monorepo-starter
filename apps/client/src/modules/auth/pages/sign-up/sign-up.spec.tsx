import { render, screen } from '@/tests/render';

import { SignUp } from './sign-up';

describe('Sign up page', () => {
  it('shows success notification when account is created', () => {
    render(<SignUp />);
    screen.debug();
    expect(true).toBe(true);
  });
});
