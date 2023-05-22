import Image from 'next/image';
import { PropsType } from './types';

const ValidationIcons: React.FC<PropsType> = ({
  errors,
  name,
  formState,
  password_related,
}) => {
  return (
    <>
      {errors[name as keyof FormData]?.message ? (
        <Image
          src='/assets/invalid.png'
          alt='valid input'
          width={80}
          height={80}
          className={`absolute bottom-[0.6rem] w-5 h-5 hover:cursor-pointer ${
            password_related ? ' right-10' : 'right-4'
          }`}
        />
      ) : (
        formState.dirtyFields[name as keyof FormData] && (
          <Image
            src='/assets/valid.png'
            alt='valid input'
            width={80}
            height={80}
            className={`absolute right-4 bottom-[0.7rem] w-4 h-4 hover:cursor-pointer ${
              password_related ? ' right-10' : 'right-4'
            }`}
          />
        )
      )}
    </>
  );
};
export default ValidationIcons;
