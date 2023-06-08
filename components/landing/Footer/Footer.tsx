import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('landing');

  return (
    <div className='bg-background uppercase text-[0.4rem] py-2 text-cream pl-7 lg:text-[0.8rem] lg:py-5 lg:pl-16'>
      <p>{t('2022 MOVIE QUOTES. ALL RIGHTS RESERVED')}</p>
    </div>
  );
};
export default Footer;
