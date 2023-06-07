import { useState } from 'react';
import { useRouter } from 'next/router';

const useLangSwitch = () => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { locales, locale, push, pathname } = useRouter();

  return {
    locales,
    locale,
    push,
    pathname,
    showLangDropdown,
    setShowLangDropdown,
  };
};
export default useLangSwitch;
