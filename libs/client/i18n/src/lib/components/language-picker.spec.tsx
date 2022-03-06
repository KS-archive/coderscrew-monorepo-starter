import { render, screen } from '../../tests';
import { supportedLngs } from '../i18n.config';
import { LanguagePicker } from './language-picker';

describe('LanguagePicker', () => {
  it('displays buttons for all languages available in the app', () => {
    render(<LanguagePicker />);

    const buttons = screen.getAllByRole('button');
    const buttonsContents = buttons.map((button) => button.textContent?.toLowerCase());

    expect(supportedLngs).toEqual(buttonsContents);
  });
});
