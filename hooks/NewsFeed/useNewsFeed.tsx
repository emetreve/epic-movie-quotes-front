import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { getQuotes } from '@/services';
import { useUiContext } from '@/store';
import { useForm } from 'react-hook-form';
import { SearchQuotesData, Quote } from '@/types';

const useNewsFeed = () => {
  const [showSearchLg, setShowSearchLg] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchedQuotes, setSearchedQuotes] = useState<Quote[]>();
  const { showBrugerMenu, showBurger } = useUiContext();

  const { t } = useTranslation('newsfeed');

  const { locale } = useRouter();

  const { logged, user } = useCheckIfLoggedIn();

  const fetchQuotes = async () => {
    const response = await getQuotes(locale as string);
    return response.data;
  };

  const { data: quotes } = useQuery('quotes', fetchQuotes);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const handleOutsideClick = () => {
    if (showSearchLg) {
      setShowSearchLg(false);
    }
    if (showBrugerMenu) {
      showBurger(false);
    }
    reset();
  };

  const fetchNewSearchQuotes = async (locale: string, search: string) => {
    try {
      const response = await getQuotes(search, locale);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchNewSearchQuotes = async (search: string) => {
    try {
      const newQuotesData = await fetchNewSearchQuotes(
        search,
        locale as string
      );
      setSearchedQuotes(newQuotesData);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: SearchQuotesData) => {
    if (data.search.startsWith('#')) {
      data.search = '*' + data.search.substring(1);
    }
    handleFetchNewSearchQuotes(data.search);
    reset();
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
    register,
    handleSubmit,
    onSubmit,
    searchedQuotes,
  };
};

export default useNewsFeed;
