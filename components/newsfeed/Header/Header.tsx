import Image from 'next/image';
import { PropsType } from './types';
import useHeader from './useHeader';
import { LangSwitch } from '@/components';

const Header: React.FC<PropsType> = ({ hideSearch }) => {
  const { handleLogout } = useHeader();

  return (
    <>
      <div className='flex lg:hidden justify-between items-center py-6 text-xs lg:text-base px-7 lg:px-16 bg-violet bg-opacity-80'>
        <Image
          src='/assets/burger-menu.png'
          alt='burger menu dropdown'
          width={96}
          height={96}
          className='lg:hidden inline h-5 w-auto hover:cursor-pointer'
        />
        <div className='flex items-center'>
          {!hideSearch && (
            <Image
              src='/assets/search-magnifying-glass.png'
              alt='search magnifying glass'
              width={96}
              height={96}
              className='lg:hidden inline ml-2 h-5 w-auto hover:cursor-pointer'
            />
          )}
          <Image
            src='/assets/notifications-bell.png'
            alt='notifications bell'
            width={96}
            height={96}
            className='lg:hidden inline ml-4 h-5 w-auto hover:cursor-pointer'
          />
        </div>
      </div>

      <div className='hidden lg:flex justify-between items-center py-5 text-base px-16 bg-violet bg-opacity-80'>
        <p className='uppercase text-cream text-base'>Movie quotes</p>
        <div className='flex items-center'>
          <Image
            src='/assets/notifications-bell.png'
            alt='search magnifying glass'
            width={96}
            height={96}
            className='h-7 w-auto mr-7 hover:cursor-pointer'
          />
          <LangSwitch />
          <button
            onClick={handleLogout}
            className='ml-9 text-white py-[0.5rem] px-6 rounded-md border mr-0 border-white hover:cursor-pointer'
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
