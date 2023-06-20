import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { UiContextProvider, QuotesContextProvider } from '@/store';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UiContextProvider>
        <QuotesContextProvider>
          <Component {...pageProps} />
        </QuotesContextProvider>
      </UiContextProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
