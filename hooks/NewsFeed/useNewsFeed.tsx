import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { getQuotes } from '@/services';
import { useUiContext } from '@/store';
import { useForm } from 'react-hook-form';
import { SearchQuotesData, Quote } from '@/types';
import { usePusher } from '@/hooks';
import { useQueryClient } from 'react-query';
import { Like } from '@/types';

const useNewsFeed = () => {
  const [showSearchLg, setShowSearchLg] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchedQuotes, setSearchedQuotes] = useState<Quote[]>();
  const [quotesData, setQuotesData] = useState<Quote[]>([]);
  const [firstRender, setFirstRender] = useState(true);
  const {
    showBrugerMenu,
    showBurger,
    showSearchMobile,
    showSearchMob,
    showAddQuote,
    showAddNewQuote,
  } = useUiContext();

  const { t } = useTranslation('newsfeed');

  const { locale } = useRouter();

  const { logged, user } = useCheckIfLoggedIn();

  const fetchQuotes = async ({ pageParam = 1 }) => {
    const response = await getQuotes(locale as string, pageParam);
    setFirstRender(false);
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery('quotes', fetchQuotes, {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.pagination.current_page + 1;
        return nextPage <= lastPage.pagination.last_page ? nextPage : undefined;
      },
      onSuccess: (newQuotes) => {
        const latestQuotes = newQuotes.pages[newQuotes.pages.length - 1].quotes;
        setQuotesData((prevQuotes) => [...prevQuotes, ...latestQuotes]);
      },
      enabled: firstRender,
    });

  console.log(999, data?.pages[0].quotes);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    const currentObserver = observerRef.current;

    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [handleObserver]);

  // const { data: quotes } = useQuery('quotes', fetchQuotes);

  // const queryClient = useQueryClient();

  usePusher();

  useEffect(() => {
    const channelLike = window.Echo.channel('like-updated');
    channelLike.listen('LikeUpdated', function (data: Like) {
      if (data) {
        // queryClient.invalidateQueries('quotes');
      }
    });

    const channelComment = window.Echo.channel('comment-updated');
    channelComment.listen('CommentUpdated', function (data: Like) {
      if (data) {
        // queryClient.invalidateQueries('quotes');
      }
    });

    return () => {
      channelLike.stopListening('LikeUpdated');
      channelComment.stopListening('CommentUpdated');
    };
  }, [user]);

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

  const fetchNewSearchQuotes = async (
    locale: string,
    page: number,
    search: string
  ) => {
    try {
      const response = await getQuotes(search, page, locale);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchNewSearchQuotes = async (search: string, page: number) => {
    try {
      const newQuotesData = await fetchNewSearchQuotes(
        search,
        page,
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
    handleFetchNewSearchQuotes(data.search, 1);
    reset();

    if (showSearchMobile) {
      showSearchMob(false);
    }
  };

  return {
    logged,
    user,
    quotesData,
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
    showSearchMobile,
    showSearchMob,
    showAddQuote,
    showAddNewQuote,
    observerRef,
  };
};

export default useNewsFeed;
