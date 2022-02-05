import { isNodeProcess } from 'is-node-process';
import { RestContext, RestRequest } from 'msw';

import { setCookie } from './cookies';

export const enhanceCtx = (ctx: RestContext, req: RestRequest): RestContext => {
  const cookie = ((...args) =>
    isNodeProcess() ? setCookie(req)(...args) : ctx.cookie(...args)) as RestContext['cookie'];

  return { ...ctx, cookie };
};
