import { Button, styled, Typography } from '@ccms/ui';

import { Auth } from '@/modules/auth';
import { I18n } from '@/services/i18n';

import { useDashboardTranslations } from './locales';

const PageContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.colors.gray[50],
}));

const Title = styled(Typography)({
  marginBottom: 12,
});

const StyledButton = styled(Button)({
  marginTop: 80,
});

const StyledLanguagePicker = styled(I18n.LanguagePicker)({
  position: 'fixed',
  top: 16,
  left: 0,
  right: 0,
});

export const Dashboard = () => {
  const { t } = useDashboardTranslations();
  const user = Auth.selectors.useAuthorizedUser();

  return (
    <PageContainer>
      <Title size="3xl" weight="bold" color="title">
        {t('title', { user: user?.email ?? '' })}
      </Title>
      <Typography size="lg" weight="normal" color="primary">
        {t('content')}
      </Typography>
      <StyledLanguagePicker />
      <StyledButton size="xl" variant="solid" color="primary" onClick={() => Auth.actions.logout()}>
        {t('logOut')}
      </StyledButton>
    </PageContainer>
  );
};
