import Image from 'next/image';
import { useNewsFeed } from '@/hooks';
import { Header, NewsItem } from '@/components';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Quote } from '@/types';
import { AddNewQuote, SideProfilePanel } from '@/components';

const Newsfeed = () => {
  const {
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
  } = useNewsFeed();

  if (logged) {
    return (
      <div
        onClick={handleOutsideClick}
        className='bg-gradient-violet min-h-screen relative pb-5 lg:pb-14'
      >
        <div className='h-[5rem]'>
          <Header
            userName={user.name}
            avatar={user.avatar}
            authUserId={user.id}
          />
        </div>
        {showSearchMobile && (
          <div className='lg:hidden bg-gradient-violet min-h-screen w-screen absolute'>
            <div className='pt-6 px-4 flex flex-row items-center border-b border-gray-700 pb-6'>
              <Image
                src='/assets/back-hd.png'
                alt='go back'
                width={96}
                height={96}
                className='inline ml-4 w-4 h-auto hover:cursor-pointer'
                onClick={() => {
                  showSearchMob(false);
                }}
              />
              <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                <input
                  {...register('search', { required: true })}
                  className='text-white ml-6 text-sm bg-transparent placeholder-white w-full'
                  placeholder={`${t('Search')}`}
                />
              </form>
            </div>
            <div className='text-gray-500 text-sm ml-[4.5rem] pt-6'>
              <p>
                {t('Enter')} <span className='text-white'>@</span>{' '}
                {t('to search movies')}
              </p>
              <p className='pt-5'>
                {t('Enter')} <span className='text-white'>#</span>{' '}
                {t('to search quotes')}
              </p>
            </div>
          </div>
        )}

        {showAddNewQuote && (
          <AddNewQuote
            userName={user.name}
            avatar={user.avatar}
            userId={user.id}
          />
        )}
        <div
          onClick={() => {
            showAddQuote(true);
          }}
          className='lg:hidden hover:cursor-pointer flex px-7 py-8 items-center'
        >
          <Image
            src='/assets/write-new-quote.png'
            alt='write new quote'
            width={96}
            height={96}
            className='h-5 w-auto mr-3'
          />
          <p className='text-white text-sm'>{t('Write new quote')}</p>
        </div>
        <div>
          <div className='hidden lg:flex text-white'>
            <div className='w-[25%] fixed'>
              <SideProfilePanel avatar={user.avatar} name={user.name} />
            </div>

            <div className='h-[13rem] ml-[25.2%] w-full'>
              <div className='w-[66%] px-8 pt-10'>
                <div
                  className={`flex frex-row  ${
                    showSearchLg ? '' : 'justify-between'
                  }`}
                >
                  <div
                    onClick={() => {
                      showAddQuote(true);
                    }}
                    className={`${
                      showSearchLg ? 'w-fit pr-3' : 'w-[82%]'
                    } hover:cursor-pointer transition-width duration-300 ease-in-out h-12 flex flex-row items-center bg-violet bg-opacity-80 rounded-lg text-lg`}
                  >
                    <Image
                      src='/assets/write-new-quote.png'
                      alt='write new quote'
                      width={96}
                      height={96}
                      className='h-6 w-auto ml-3 mr-4'
                    />
                    <p>{t('Write new quote')}</p>
                  </div>
                  <div
                    className={`${
                      showSearchLg
                        ? 'pl-6 w-[40rem] border-b border-slate-600 pb-3 ml-12 relative'
                        : 'mr-3'
                    } h-12 flex flex-row items-center text-lg`}
                  >
                    <Image
                      src='/assets/search-magnifying-glass.png'
                      alt='search magnifying glass'
                      width={96}
                      height={96}
                      onClick={() => {
                        setShowSearchLg(true);
                      }}
                      className={`${
                        showSearchLg && 'px-0 mx-0 absolute left-1'
                      } h-[1.2rem] w-auto mr-5 hover:cursor-pointer z-30`}
                    />
                    {showSearchLg ? (
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        className='w-full relative text-gray-400 z-40'
                      >
                        <p className={`${focused && 'invisible'} ml-5`}>
                          {t('Enter')} <span className='text-white'>@</span>{' '}
                          {t('to search movies')}, {t('Enter')}{' '}
                          <span className='text-white'>#</span>{' '}
                          {t('to search quotes')}
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <input
                            {...register('search', { required: true })}
                            id='search'
                            className='text-white w-full pl-1 ml-4 bg-transparent bottom-[0.04rem] absolute'
                            name='search'
                            onFocus={() => setFocused(true)}
                            onBlur={() => {
                              setShowSearchLg(false);
                              setFocused(false);
                            }}
                          />
                        </form>
                      </div>
                    ) : (
                      <p
                        onClick={() => {
                          setShowSearchLg(true);
                        }}
                        className='text-gray-400 hover:cursor-pointer z-30 relative'
                      >
                        {t('Search by')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:ml-[26.7%] lg:w-[46.2%] w-full static top-[9.5rem] lg:top-[8rem] lg:-mt-[6rem]'>
          {quotesData?.length > 0 &&
            searchedQuotes.length < 1 &&
            quotesData.map((quote: Quote, quoteIndex: number) => {
              return (
                <div
                  key={quote.id}
                  ref={
                    quotesData.length === quoteIndex + 1
                      ? observerRef
                      : undefined
                  }
                >
                  <NewsItem
                    authUserId={user.id}
                    authUserAvatar={user.avatar || ''}
                    quoteId={quote.id}
                    userId={user.id}
                    userAvatar={quote.user.avatar || ''}
                    userName={quote.user.name}
                    quote={quote.body[locale as keyof typeof quote.body]}
                    movie={quote.movie.name[locale as keyof typeof quote.body]}
                    year={quote.movie.year}
                    quoteImage={
                      quote.image
                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${quote.image}`
                        : '/assets/quote-sample.png'
                    }
                    likesQuantity={
                      quote.likes?.length ? quote.likes?.length : 0
                    }
                    likes={quote.likes}
                    commentsQuantity={quote.comments?.length || 0}
                    comments={quote.comments}
                  />
                </div>
              );
            })}
          {searchedQuotes &&
            searchedQuotes.map((quote: Quote, index) => {
              return (
                <div
                  key={quote.id}
                  ref={
                    searchedQuotes.length === index + 1
                      ? observerRefSearch
                      : undefined
                  }
                >
                  <NewsItem
                    authUserId={user.id}
                    authUserAvatar={user.avatar || ''}
                    quoteId={quote.id}
                    userId={user.id}
                    userAvatar={quote.user.avatar || ''}
                    userName={quote.user.name}
                    quote={quote.body[locale as keyof typeof quote.body]}
                    movie={quote.movie.name[locale as keyof typeof quote.body]}
                    year={quote.movie.year}
                    quoteImage={
                      quote.image
                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${quote.image}`
                        : '/assets/quote-sample.png'
                    }
                    likesQuantity={
                      quote.likes?.length ? quote.likes?.length : 0
                    }
                    likes={quote.likes}
                    commentsQuantity={quote.comments?.length || 0}
                    comments={quote.comments}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};
export default Newsfeed;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'newsfeed',
        'profile',
      ])),
    },
  };
};
