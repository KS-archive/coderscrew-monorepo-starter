import { Button, styled, Typography } from '@ccms/ui';

import { Auth } from '@/modules/auth';

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

export const Dashboard = () => {
  const user = Auth.selectors.useAuthorizedUser();

  return (
    <PageContainer>
      <Title size="3xl" weight="bold" color="title">
        Welcome in the app {user?.email}
      </Title>
      <Typography size="lg" weight="normal" color="primary">
        For now there is not too much to do, but it will change soon :D
      </Typography>
      <StyledButton size="xl" variant="solid" color="primary" onClick={() => Auth.actions.logout()}>
        Log out
      </StyledButton>
    </PageContainer>
  );
};
