import { ComponentPropsWithoutRef, Suspense } from 'react';

import { Button, styled } from '@ccms/ui';

import { supportedLngs } from '../i18n.config';
import { i18nActions } from '../store/i18n.actions';
import { i18nSelectors } from '../store/i18n.selectors';

const LanguagePickerContainer = styled.div({
  display: 'flex',

  '* + *': {
    marginLeft: 16,
  },
});

const LanguagePickerComponent = (props: ComponentPropsWithoutRef<'div'>) => {
  const language = i18nSelectors.useCurrentLanguage();

  return (
    <LanguagePickerContainer {...props}>
      {supportedLngs.map((lang) => (
        <Button
          key={lang}
          onClick={() => i18nActions.setCurrentLanguage(lang)}
          color={language === lang ? 'primary' : 'gray'}
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </LanguagePickerContainer>
  );
};

export const LanguagePicker = (props: ComponentPropsWithoutRef<'div'>) => (
  <Suspense fallback={false}>
    <LanguagePickerComponent {...props} />
  </Suspense>
);
