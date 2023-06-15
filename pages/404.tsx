import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const NotFound = () => {
  const { t } = useTranslation('statuspages');

  return (
    <div className='h-screen w-screen bg-gradient-violet pb-20 text-white flex flex-col items-center justify-center'>
      <Image
        src='/assets/ghost.png'
        alt='ghost'
        width={456}
        height={512}
        className='h-32 w-auto'
      />
      <Image
        src='/assets/ghost-ground.png'
        alt='ghost'
        width={4279}
        height={512}
        className='w-24 h-auto mt-7'
      />
      <h1 className='text-bold text-2xl pt-6 pb-4 lg:pt-10 lg:pb-5 lg:text-5xl'>
        {t('Whoops!')}
      </h1>
      <p className='text-sm lg:text-2xl'>
        {t('We cant see the page you are looking for')}
      </p>
      <Link href='/' className='hover:cursor-pointer'>
        <button className='mt-5 text-white bg-red py-[0.6rem] px-7 lg:text-xl lg:px-4 lg:w-fit rounded-md lg:mt-12'>
          {t('Return home')}
        </button>
      </Link>
    </div>
  );
};
export default NotFound;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['statuspages'])),
    },
  };
};
