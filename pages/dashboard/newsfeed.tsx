import Image from 'next/image';
import Link from 'next/link';
import { useNewsFeed } from '@/hooks';
import { Header, NewsItem } from '@/components';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Quote } from '@/types';
import { AddNewQuote } from '@/components';

const Newsfeed = () => {
  const {
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
    showSearchMobile,
    showSearchMob,
    showAddQuote,
    showAddNewQuote,
  } = useNewsFeed();

  if (logged) {
    return (
      <div
        onClick={handleOutsideClick}
        className='bg-gradient-violet min-h-screen relative pb-5 lg:pb-14'
      >
        <Header userName={user.name} avatar={user.avatar} />
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
                  placeholder='Search'
                />
              </form>
            </div>
            <div className='text-gray-500 text-sm ml-[4.5rem] pt-6'>
              <p>
                Enter <span className='text-white'>@</span> to search movies
              </p>
              <p className='pt-5'>
                Enter <span className='text-white'>#</span> to search quotes
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
          <div className='hidden lg:flex text-white px-16 pt-10'>
            <div className='w-[25%]'>
              <div className='flex flex-row'>
                <Image
                  src={
                    user.avatar
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.avatar}`
                      : '/assets/avatar-default.png'
                  }
                  alt='user headshot'
                  width={512}
                  height={512}
                  className='h-16 w-16 rounded-[50%] mr-3'
                />
                <div className='ml-3 pt-1'>
                  <p className='text-xl'>{user.name}</p>
                  <Link href='/dashboard/profile'>
                    <p className='text-gray-400'>{t('Edit your profile')}</p>
                  </Link>
                </div>
              </div>
              <div className='flex flex-row mt-9 ml-3'>
                <Image
                  src='/assets/home-red.png'
                  alt='home'
                  width={512}
                  height={462}
                  className='h-7 w-auto mr-3'
                />
                <Link href='/dashboard/newsfeed'>
                  <p className='text-xl inline-block ml-5'>{t('News feed')}</p>
                </Link>
              </div>
              <div className='flex flex-row mt-10 ml-3'>
                <Image
                  src='/assets/movie-camera.png'
                  alt='camera for shooting movies'
                  width={512}
                  height={462}
                  className='h-7 w-auto mr-3'
                />
                <p className='text-xl inline-block ml-5'>
                  {t('List of movies')}
                </p>
              </div>
            </div>

            <div className='w-[50%]'>
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
                    } h-[1.2rem] w-auto mr-5 hover:cursor-pointer z-40`}
                  />
                  {showSearchLg ? (
                    <div
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      className='w-full relative text-gray-400 z-40'
                    >
                      <p className={`${focused && 'invisible'} ml-5`}>
                        Enter <span className='text-white'>@</span> to search
                        movies, Enter <span className='text-white'>#</span> to
                        search quotes
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
                      className='text-gray-400 hover:cursor-pointer z-40 relative'
                    >
                      {t('Search by')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:ml-[26.7%] lg:w-[46.2%] w-full static top-[9.5rem] lg:top-[8rem] lg:-mt-[7.8rem]'>
          {quotes?.length > 0 &&
            !searchedQuotes &&
            quotes.map((quote: Quote) => (
              <div key={quote.id}>
                <NewsItem
                  authUserId={user.id}
                  quote_id={quote.id}
                  user_id={user.id}
                  userName={quote.user.name}
                  quote={quote.body[locale as keyof typeof quote.body]}
                  movie={quote.movie.name[locale as keyof typeof quote.body]}
                  year={quote.movie.year}
                  quoteImage={
                    quote.image
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${quote.image}`
                      : '/assets/quote-sample.png'
                  }
                  likesQty={quote.likes?.length ? quote.likes?.length : 0}
                  likes={quote.likes}
                  commentsQty={quote.comments?.length || 0}
                  comments={quote.comments}
                />
              </div>
            ))}
          {searchedQuotes &&
            searchedQuotes.map((quote: Quote) => (
              <div key={quote.id}>
                <NewsItem
                  authUserId={user.id}
                  quote_id={quote.id}
                  user_id={user.id}
                  userName={quote.user.name}
                  quote={quote.body[locale as keyof typeof quote.body]}
                  movie={quote.movie.name[locale as keyof typeof quote.body]}
                  year={quote.movie.year}
                  quoteImage={
                    quote.image
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${quote.image}`
                      : '/assets/quote-sample.png'
                  }
                  likesQty={quote.likes?.length ? quote.likes?.length : 0}
                  likes={quote.likes}
                  commentsQty={quote.comments?.length || 0}
                  comments={quote.comments}
                />
              </div>
            ))}
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
