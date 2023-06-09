import Image from 'next/image';
import { PropsType } from './types';
import useLangSwitch from './useLangSwitch';

const LangSwitch: React.FC<PropsType> = ({ fromBurgerMenu }) => {
  const {
    locales,
    locale,
    showLangDropdown,
    setShowLangDropdown,
    handleLocaleChange,
  } = useLangSwitch();

  return (
    <span
      onClick={() => {
        setShowLangDropdown((prev) => !prev);
      }}
      id='dropdown-toggle'
      className='cursor-pointer flex items-center w-14 text-white'
    >
      <p className='inline lg:text-lg'>{locale === 'en' ? 'Eng' : 'ქარ'}</p>

      <div className='relative'>
        <div
          className={`${!showLangDropdown && 'hidden'} ${
            fromBurgerMenu
              ? '-right-24 mt-7 bg-transparent'
              : '-right-4 mt-11 bg-profile-dark-blue'
          } w-28 absolute top-0 bg-opacity-90 rounded-md shadow-lg`}
          id='dropdown-content'
        >
          <ul className='flex flex-col items-center rounded-m'>
            {locales &&
              locales.map((locale) => (
                <li
                  key={locale}
                  className={`${
                    fromBurgerMenu ? '' : 'text-center'
                  } hover:bg-opacity-100 hover:bg-violet rounded-md py-2 w-full text-sm lg:text-lg`}
                >
                  <p
                    onClick={() => {
                      handleLocaleChange(locale);
                    }}
                  >
                    {locale === 'en' ? 'English' : 'ქართული'}
                  </p>
                </li>
              ))}
          </ul>
        </div>
        <Image
          src='/assets/lang-switch.png'
          alt='language switcher'
          width={768}
          height={512}
          className='inline ml-2 h-2 w-3'
        />
      </div>
    </span>
  );
};
export default LangSwitch;
