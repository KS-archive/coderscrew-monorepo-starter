import type { ComponentPropsWithoutRef } from 'react';

import { Button, styled } from '@ccms/ui';

import { LANGUAGES } from '../i18n.constants';
import { i18nActions } from '../store/i18n.actions';
import { i18nSelectors } from '../store/i18n.selectors';

const LanguagePickerContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',

  '* + *': {
    marginLeft: 16,
  },
});

export const LanguagePicker = (props: ComponentPropsWithoutRef<'div'>) => {
  const language = i18nSelectors.useCurrentLanguage();

  return (
    <LanguagePickerContainer {...props}>
      {LANGUAGES.map((lang) => (
        <Button onClick={() => i18nActions.setLanguage(lang)} color={language === lang ? 'primary' : 'gray'}>
          {lang.toUpperCase()}
        </Button>
      ))}
    </LanguagePickerContainer>
  );
};
