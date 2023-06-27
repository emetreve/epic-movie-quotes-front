import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { useCheckIfLoggedIn } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { getQuotes } from '@/services';
import { useUiContext } from '@/store';
import { useForm } from 'react-hook-form';
import { SearchQuotesData, QuoteMessage, Quote } from '@/types';
import { usePusher } from '@/hooks';
import { useQueryClient } from 'react-query';
import { useQuotesContext } from '@/store';

const useNewsFeed = () => {
  const [showSearchLg, setShowSearchLg] = useState(false);
  const [focused, setFocused] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [lastSearchPage, setLastSearchPage] = useState(1);
  const [likeReceived, setLikeReveiced] = useState<Quote>();

  const {
    showBrugerMenu,
    showBurger,
    showSearchMobile,
    showSearchMob,
    showAddQuote,
    showAddNewQuote,
    setShowLangDropdown,
    showLangDropdown,
  } = useUiContext();

  const { searchedQuotes, setSearchedQuotes, quotesData, setQuotesData } =
    useQuotesContext();

  const { t } = useTranslation('newsfeed');

  const { locale } = useRouter();

  const { logged, user } = useCheckIfLoggedIn();

  const fetchQuotes = async ({ pageParam = 1 }) => {
    const response = await getQuotes(locale as string, pageParam);
    setFirstRender(false);
    return response.data;
  };

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    'quotes',
    fetchQuotes,
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.pagination.current_page + 1;
        return nextPage <= lastPage.pagination.last_page ? nextPage : undefined;
      },
      onSuccess: (newQuotes) => {
        const latestQuotes = newQuotes.pages[newQuotes.pages.length - 1].quotes;
        setQuotesData([...quotesData, ...latestQuotes]);
      },
      enabled: firstRender,
    }
  );

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

  usePusher();

  useEffect(() => {
    if (searchedQuotes.length > 0) {
      const updatedQuotes = searchedQuotes.map((quote) =>
        quote.id === likeReceived?.id ? likeReceived : quote
      );
      setSearchedQuotes(updatedQuotes);
    }
  }, [likeReceived]);

  useEffect(() => {
    const channelLike = window.Echo.channel('like-updated');
    channelLike.listen('LikeUpdated', function (data: QuoteMessage) {
      if (data) {
        setLikeReveiced(data.message);
        const updatedQuote = data.message;

        if (!(searchedQuotes.length > 0)) {
          const updatedQuotes = quotesData.map((quote) =>
            quote.id === updatedQuote.id ? updatedQuote : quote
          );
          setQuotesData(updatedQuotes);
        }
      }
    });

    const channelComment = window.Echo.channel('comment-updated');
    channelComment.listen('CommentUpdated', function (data: QuoteMessage) {
      if (data) {
        const updatedQuote = data.message;

        if (searchedQuotes.length > 0) {
          const updatedQuotes = searchedQuotes.map((quote) =>
            quote.id === updatedQuote.id ? updatedQuote : quote
          );
          setSearchedQuotes(updatedQuotes);
        } else {
          const updatedQuotes = quotesData.map((quote) =>
            quote.id === updatedQuote.id ? updatedQuote : quote
          );
          setQuotesData(updatedQuotes);
        }
      }
    });

    return () => {
      channelLike.stopListening('LikeUpdated');
      channelComment.stopListening('CommentUpdated');
    };
  }, [user, quotesData]);

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
    if (showLangDropdown) {
      setShowLangDropdown(!showLangDropdown);
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
      setCurrentSearchPage(response.data.pagination.current_page);
      setLastSearchPage(response.data.pagination.last_page);
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
      if (page === 1) {
        setSearchedQuotes([...newQuotesData.quotes]);
      } else {
        setSearchedQuotes([...searchedQuotes, ...newQuotesData.quotes]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleObserverSearch = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && lastSearchPage - currentSearchPage !== 0) {
        handleFetchNewSearchQuotes(
          localStorage.getItem('search') as string,
          currentSearchPage + 1
        );
      }
    },
    [lastSearchPage, currentSearchPage]
  );

  const observerRefSearch = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserverSearch, options);
    const currentObserver = observerRefSearch.current;

    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [handleObserverSearch]);

  const queryClient = useQueryClient();

  const onSubmit = (data: SearchQuotesData) => {
    setSearchedQuotes([]);
    setQuotesData([]);
    queryClient.removeQueries('quotes');
    queryClient.removeQueries('searchquotes');
    if (data.search.startsWith('#')) {
      data.search = '*' + data.search.substring(1);
    }
    localStorage.setItem('search', data.search);
    setTimeout(() => {
      handleFetchNewSearchQuotes(data.search, 1);
    }, 500);
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
    observerRefSearch,
  };
};

export default useNewsFeed;
