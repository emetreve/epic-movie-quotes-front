import { useState } from 'react';
import { useRouter } from 'next/router';

const useLangSwitch = () => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { locales, locale, push, pathname, query } = useRouter();

  const handleLocaleChange = (locale: string) => {
    push({ pathname, query }, '', { locale });
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
