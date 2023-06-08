import { useState } from 'react';
import { useRouter } from 'next/router';

const useLangSwitch = () => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { locales, locale, push, pathname } = useRouter();

  const handleLocaleChange = (locale: string) => {
    push(pathname, pathname, { locale });
    localStorage.setItem('locale', locale);
  };

  return {
    locales,
    locale,
    push,
    pathname,
    showLangDropdown,
    setShowLangDropdown,
    handleLocaleChange,
  };
};
export default useLangSwitch;
