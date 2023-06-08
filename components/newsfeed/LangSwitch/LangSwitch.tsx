import Image from 'next/image';
import useLangSwitch from './useLangSwitch';

const LangSwitch = () => {
  const {
    locales,
    locale,
    push,
    pathname,
    showLangDropdown,
    setShowLangDropdown,
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
          className={`${
            !showLangDropdown && 'hidden'
          } w-28 mt-11 absolute top-0 bg-profile-dark-blue bg-opacity-90 rounded-md shadow-lg -right-4`}
          id='dropdown-content'
        >
          <ul className='flex flex-col items-center rounded-m'>
            {locales &&
              locales.map((locale) => (
                <li
                  key={locale}
                  className='hover:bg-opacity-100 hover:bg-violet rounded-md py-2 text-center w-full text-sm lg:text-lg'
                >
                  <p
                    onClick={() => {
                      push(pathname, pathname, { locale: locale });
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
