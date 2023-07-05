import Image from 'next/image';
import { PropsType } from './types';
import Link from 'next/link';
import useSideProfilePanel from './useSideProfilePanel';
import { Home, Camera } from '@/components';

const SideProfilePanel: React.FC<PropsType> = ({ avatar, name }) => {
  const { t, handleNavigation, asPath } = useSideProfilePanel();

  return (
    <div className='h-[13rem] w-[30rem] hidden lg:flex fixed'>
      <div className='text-white px-16 pt-10 flex'>
        <div>
          <div className='flex flex-row'>
            <Image
              src={
                avatar
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${avatar}`
                  : '/assets/avatar-default.png'
              }
              alt='user headshot'
              width={512}
              height={512}
              className={`h-16 w-16 mr-3 ${
                asPath?.includes('profile') && 'border-red border-2'
              } rounded-[50%]`}
            />
            <div className='ml-3 pt-1'>
              <p className='text-xl'>{name}</p>
              <Link href='/dashboard/profile'>
                <p className='text-gray-400'>{t('Edit your profile')}</p>
              </Link>
            </div>
          </div>
          <div className='flex flex-row mt-9 ml-3'>
            <Home
              classes={
                asPath.includes('newsfeed') ? 'fill-red h-7' : 'fill-white h-7'
              }
            />
            <p
              onClick={() => {
                handleNavigation('newsfeed');
              }}
              className='text-xl inline-block ml-7 hover:cursor-pointer'
            >
              {t('News feed')}
            </p>
          </div>
          <div className='flex flex-row mt-10 ml-3'>
            <Camera
              classes={
                asPath.includes('movies') ? 'fill-red h-7' : 'fill-white h-7'
              }
            />
            <p
              onClick={() => {
                handleNavigation('movies');
              }}
              className='text-xl inline-block ml-7 hover:cursor-pointer'
            >
              {t('List of movies')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideProfilePanel;
