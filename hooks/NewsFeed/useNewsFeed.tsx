import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { getQuotes } from '@/services';
import { Quote } from '@/types';

const useNewsFeed = () => {
  const { t } = useTranslation('newsfeed');

  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const { locale } = useRouter();

  const { logged, user } = useCheckIfLoggedIn();

  const fetchQuotes = async () => {
    try {
      const response = await getQuotes();
      setQuotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return { logged, user, quotes, locale, t };
};

export default useNewsFeed;
