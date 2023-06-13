import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { getQuotes } from '@/services';
import { useUiContext } from '@/store';
import { useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { SearchQuotesData } from '@/types';

const useNewsFeed = () => {
  const [showSearchLg, setShowSearchLg] = useState(false);
  const [focused, setFocused] = useState(false);
  const { showBrugerMenu, showBurger } = useUiContext();

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
    if (showBrugerMenu) {
      showBurger(false);
    }
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      search: '',
    },
  });
  const queryClient = useQueryClient();

  const fetchNewSearchQuotes = async (search?: string) => {
    try {
      const response = await getQuotes(search);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchNewSearchQuotes = async (search: string) => {
    try {
      const newQuotesData = await fetchNewSearchQuotes(search);
      queryClient.setQueryData('quotes', newQuotesData);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: SearchQuotesData) => {
    if (data.search.startsWith('#')) {
      data.search = '*' + data.search.substring(1);
    }
    console.log(data);
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
  };
};

export default useNewsFeed;
