import { useTranslation } from 'next-i18next';
import { PropsType } from './types';

const PasswordConditionsBox: React.FC<PropsType> = ({
  isValidMinCharacters,
  isValidMaxCharacters,
}) => {
  const { t } = useTranslation('profile');

  return (
    <div className='pl-6 bg-transparent border mt-8 lg:w-full py-5 border-password-box-border rounded'>
      <p>{t('Passwords should contain')}</p>
      <ul className='list-disc list-inside mt-2'>
        <li className='flex items-center'>
          <span
            className={`w-1 h-1 rounded-full  mr-2 ${
              isValidMinCharacters ? 'bg-green' : 'bg-gray-500'
            }`}
          ></span>
          <span
            className={`text-xs ${
              isValidMinCharacters ? 'text-white' : 'text-gray-500'
            } `}
          >
            {t('8 or more characters')}
          </span>
        </li>
        <li className='flex items-center mt-1'>
          <span
            className={`w-1 h-1 rounded-full ${
              isValidMaxCharacters ? 'bg-green' : 'bg-gray-500'
            }  mr-2`}
          ></span>
          <span
            className={`text-xs ${
              isValidMaxCharacters ? 'text-white' : 'text-gray-500'
            }`}
          >
            {t('Maximum 15 characters')}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default PasswordConditionsBox;
