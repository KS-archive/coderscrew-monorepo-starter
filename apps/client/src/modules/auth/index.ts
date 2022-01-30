import { authModuleConfig } from './auth.config';

export { AuthorizedGuard } from './guards/authorized.guard';
export { UnauthorizedGuard } from './guards/unauthorized.guard';
export { signInRoute } from './pages/sign-in';
export { signUpRoute } from './pages/sign-up';
export { authActions } from './store/auth.actions';
export { authSelectors } from './store/auth.selectors';

export const initializeAuthModule = authModuleConfig.initialize;
