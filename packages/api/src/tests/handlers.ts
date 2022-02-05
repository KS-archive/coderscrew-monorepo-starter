import { loginRequestHandler } from '@/modules/auth/login/login.handlers';
import { logoutRequestHandler } from '@/modules/auth/logout/logout.handlers';
import { meRequestHandler } from '@/modules/auth/me/me.handlers';
import { registerRequestHandler } from '@/modules/auth/register/register.handlers';

export const handlers = [registerRequestHandler, loginRequestHandler, meRequestHandler, logoutRequestHandler];
