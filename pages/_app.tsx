import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { UiContextProvider } from '@/store';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UiContextProvider>
        <Component {...pageProps} />
      </UiContextProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
