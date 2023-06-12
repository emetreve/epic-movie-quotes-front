import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { getQuotes } from '@/services';

const useNewsFeed = () => {
  const { t } = useTranslation('newsfeed');

  const { locale } = useRouter();

  const { logged, user } = useCheckIfLoggedIn();

  const fetchQuotes = async () => {
    const response = await getQuotes();
    console.log(response.data);
    return response.data;
  };

  const { data: quotes } = useQuery('quotes', fetchQuotes);

  return { logged, user, quotes, locale, t };
};

export default useNewsFeed;
