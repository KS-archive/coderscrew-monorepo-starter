import { AuthModuleProvider } from './auth.provider';
import { AuthorizedGuard } from './guards/authorized.guard';
import { UnauthorizedGuard } from './guards/unauthorized.guard';
import { signInRoute } from './pages/sign-in';
import { signUpRoute } from './pages/sign-up';
import { authActions } from './store/auth.actions';
import { authSelectors } from './store/auth.selectors';

export const Auth = {
  Provider: AuthModuleProvider,
  Guard: { Authorized: AuthorizedGuard, Unauthorized: UnauthorizedGuard },
  routes: { signIn: signInRoute, signUp: signUpRoute },
  selectors: authSelectors,
  actions: authActions,
};
