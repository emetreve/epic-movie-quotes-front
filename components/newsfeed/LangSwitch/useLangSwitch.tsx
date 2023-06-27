import { useRouter } from 'next/router';
import { useUiContext } from '@/store';

const useLangSwitch = () => {
  const { locales, locale, push, pathname, query } = useRouter();
  const { showLangDropdown, setShowLangDropdown } = useUiContext();

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
