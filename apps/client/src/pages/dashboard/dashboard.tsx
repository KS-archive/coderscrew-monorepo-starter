import { accountRoute } from '@/pages/account/account.route';
import { childRoute } from '@/pages/nested/child/child.route';
import { nestedRoute } from '@/pages/nested/nested.route';
import { searchRoute } from '@/pages/search/search.route';
import { useNavigate } from '@/services/routing/use-navigate';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>Dashboard page</div>
      <div>
        <button type="button" onClick={() => navigate({ to: searchRoute.path({ param1: 'value1' }) })}>
          Go to search page
        </button>
      </div>
      <div>
        <button type="button" onClick={() => navigate({ to: accountRoute.path(12) })}>
          Go to account page
        </button>
      </div>
      <div>
        <button type="button" onClick={() => navigate({ to: nestedRoute.path() })}>
          Go to nested page parent
        </button>
      </div>
      <div>
        <button type="button" onClick={() => navigate({ to: childRoute.path() })}>
          Go to nested page child
        </button>
      </div>
    </div>
  );
};
