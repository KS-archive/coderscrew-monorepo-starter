import { useMatch } from 'react-location';

export const ViteId = () => {
  const { id } = useMatch().params;

  return (
    <div>
      <p> Vite component: {id} </p>
    </div>
  );
};
