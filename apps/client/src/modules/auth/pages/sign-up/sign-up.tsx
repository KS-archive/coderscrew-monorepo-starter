import { Button, Input, styled, Typography } from '@ccms/ui';

import { useForm } from '@/services/forms';
import { Trans, useTranslation } from '@/services/i18n';
import { Link } from '@/services/routing';

import { authActions } from '../../store/auth.actions';
import { signInRoute } from '../sign-in';

type FormValues = {
  email: string;
  password: string;
};

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

export const SignUp = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'signUp' });
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => authActions.register(data));

  return (
    <PageContainer>
      <Typography size="3xl" weight="bold" color="title">
        {t('title')}
      </Typography>
      <Form onSubmit={onSubmit}>
        <FormFields>
          <Input {...register('email')} placeholder={t('emailPlaceholder')} size="lg" variant="filled" />
          <Input {...register('password')} placeholder={t('passwordPlaceholder')} size="lg" variant="filled" />
        </FormFields>
        <Button type="submit" size="xl" color="primary" variant="solid" width={280}>
          {t('signInButtonLabel')}
        </Button>
      </Form>
      <Typography size="lg" weight="normal" color="primary">
        <Trans i18nKey="signUp.goToSignIn" ns="auth">
          Already have account?
          <Link preload to={signInRoute.path()} size="lg" weight="medium">
            Sign in
          </Link>
        </Trans>
      </Typography>
    </PageContainer>
  );
};
