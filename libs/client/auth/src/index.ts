import { authModuleConfig } from './lib/auth.config';

export { AuthorizedGuard } from './lib/guards/authorized.guard';
export { UnauthorizedGuard } from './lib/guards/unauthorized.guard';
export { signInRoute } from './lib/pages/sign-in';
export { signUpRoute } from './lib/pages/sign-up';
export { authActions } from './lib/store/auth.actions';
export { authSelectors } from './lib/store/auth.selectors';

export const initializeAuthModule = authModuleConfig.initialize;
