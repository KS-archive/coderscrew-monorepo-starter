import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Trans } from '@ccms/client/i18n';
import { Link } from '@ccms/client/routing';
import { Button, FormField, Input, Typography } from '@ccms/ui';

import { authActions } from '../../store/auth.actions';
import { signUpRoute } from '../sign-up';

type FormValues = z.infer<ReturnType<typeof useValidationSchema>>;

const PageContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.colors.gray[50],
}));

const Form = styled.form(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 48,
  marginTop: 48,
  marginBottom: 32,
  borderRadius: 24,
  backgroundColor: theme.colors.white,
  boxShadow: theme.shadows.xl,

  '* + *': {
    marginTop: 48,
  },
}));

const FormFields = styled.div({
  width: 360,

  '* + *': {
    marginTop: 32,
  },
});

const useValidationSchema = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'validation' });

  const schema = z.object({
    email: z.string().nonempty(t('emptyEmail')).email(t('incorrectEmail')),
    password: z.string().nonempty(t('emptyPassword')),
  });

  return schema;
};

export const SignIn = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'signIn' });
  const validationSchema = useValidationSchema();
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(validationSchema) });

  const onSubmit = handleSubmit((data) => authActions.login(data));

  return (
    <PageContainer>
      <Typography size="3xl" weight="bold" color="title">
        {t('title')}
      </Typography>
      <Form onSubmit={onSubmit}>
        <FormFields>
          <FormField size="lg" error={formState.errors.email?.message}>
            <Input {...register('email')} placeholder={t('emailPlaceholder')} variant="filled" />
          </FormField>
          <FormField size="lg" error={formState.errors.password?.message}>
            <Input {...register('password')} placeholder={t('passwordPlaceholder')} variant="filled" type="password" />
          </FormField>
        </FormFields>
        <Button type="submit" size="xl" color="primary" variant="solid" width={280}>
          {t('signInButtonLabel')}
        </Button>
      </Form>
      <Typography size="lg" weight="normal" color="primary">
        <Trans i18nKey="goToSignUp" t={t}>
          Don&apos;t have account?
          <Link preload to={signUpRoute.path()} size="lg" weight="medium">
            Create one
          </Link>
        </Trans>
      </Typography>
    </PageContainer>
  );
};
