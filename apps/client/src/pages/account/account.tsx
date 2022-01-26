import { useParams } from '@/services/routing';

import type { AccountRouteParams } from './account.route';

export const Account = () => {
  const { accountId } = useParams<AccountRouteParams>();

  return <div>Account page for account with id {accountId}</div>;
};
