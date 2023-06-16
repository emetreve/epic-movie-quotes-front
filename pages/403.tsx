import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Forbidden = () => {
  const { t } = useTranslation('statuspages');

  return (
    <div className='h-screen w-screen bg-gradient-violet text-white flex flex-col items-center justify-center'>
      <div className='relative w-full flex items-center justify-center mb-5'>
        <Image
          src='/assets/sage.png'
          alt='sage'
          width={677}
          height={512}
          className='h-32 w-auto z-50 absolute bottom-0 scale-150 lg:scale-[2]'
        />
        <Image
          src='/assets/sage-bg.png'
          alt='sage bg'
          width={819}
          height={512}
          className='w-32 h-auto mt-7 absolute bottom-5 scale-150 lg:scale-[2]'
        />
      </div>
      <h1 className='text-bold text-2xl pt-6 pb-4 lg:pt-10 lg:pb-5 lg:text-5xl'>
        {t('You shall not pass')}
      </h1>
      <div className='w-64 text-center lg:w-full lg:mt-3'>
        <p className='text-sm lg:text-2xl'>
          {t('Sorry but you dont have permission to access this page')}
        </p>
      </div>
      <Link href='/' className='hover:cursor-pointer'>
        <button className='mt-7 text-white bg-red py-[0.6rem] px-6 lg:px-4 lg:w-fit lg:text-xl rounded-md lg:mt-12'>
          {t('Return home')}
        </button>
      </Link>
    </div>
  );
};
export default Forbidden;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['statuspages'])),
    },
  };
};
