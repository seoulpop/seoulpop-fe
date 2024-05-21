import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

const NotFoundPage = () => {
  const error = useRouteError();
  useEffect(() => {
    if (
      import.meta.env.VITE_NODE_ENV === 'development' ||
      import.meta.env.VITE_NODE_ENV === 'local'
    ) {
      console.log('This is error page: ', error);
    }
  }, []);

  return (
    <div>
      <div>this is not found page</div>
    </div>
  );
};

export default NotFoundPage;
