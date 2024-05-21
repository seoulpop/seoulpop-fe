import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';

import App from '@/App';
import { PcContainer } from '@/layouts/PcLayout';
import GlobalStyles from '@/styles/GlobalStyles';
import ToastProvider from '@/utils/provide/toastProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <PcContainer />
      <App />
      <ToastProvider />
      {(import.meta.env.VITE_NODE_ENV === 'development' ||
        import.meta.env.VITE_NODE_ENV === 'local') && <ReactQueryDevtools />}
    </QueryClientProvider>
  </>,
);
