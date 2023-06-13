import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { getQuotes } from '@/services';

const useNewsFeed = () => {
  const [showSearchLg, setShowSearchLg] = useState(false);
  const [focused, setFocused] = useState(false);

  const { t } = useTranslation('newsfeed');

  const { locale } = useRouter();

  const { logged, user } = useCheckIfLoggedIn();

  const fetchQuotes = async () => {
    const response = await getQuotes();
    return response.data;
  };

  const { data: quotes } = useQuery('quotes', fetchQuotes);

  const handleOutsideClick = () => {
    if (showSearchLg) {
      setShowSearchLg(false);
    }
  };

  return {
    logged,
    user,
    quotes,
    locale,
    t,
    showSearchLg,
    setShowSearchLg,
    focused,
    setFocused,
    handleOutsideClick,
  };
};

export default useNewsFeed;
