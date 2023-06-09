import Image from 'next/image';
import { PropsType } from './types';
import { useTranslation } from 'next-i18next';

const SuccessNotification: React.FC<PropsType> = ({ show }) => {
  const { t } = useTranslation('profile');

  return (
    <div className='h-screen w-screen fixed pt-5 bg-violet z-20 bg-opacity-70 backdrop-blur-2 text-success-green'>
      <div className='bg-success-bg py-[0.9rem] flex items-center mx-3 rounded'>
        <Image
          src='/assets/success-check.png'
          alt='success green'
          width={97}
          height={96}
          className='w-[1.2rem] h-auto inline mr-2 ml-5'
        />
        <p className='inline text-sm'>{t('Changes updated succsessfully')}</p>
        <Image
          src='/assets/success-close.png'
          alt='success green'
          width={65}
          height={64}
          className='w-[0.8rem] h-auto inline ml-auto mr-3 opacity-40 hover:cursor-pointer'
          onClick={() => {
            show(false);
          }}
        />
      </div>
    </div>
  );
};
export default SuccessNotification;
