import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import {
  UiContextProvider,
  QuotesContextProvider,
  UserContextProvider,
} from '@/store';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Layout } from '@/components';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>Epic Movie Quotes</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <UiContextProvider>
            <QuotesContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QuotesContextProvider>
          </UiContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(App);
