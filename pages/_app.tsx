import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { ContextProvider } from '@/store';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </QueryClientProvider>
  );
}
