import Image from 'next/image';
import { PropsType } from './types';

const NewsItem: React.FC<PropsType> = ({
  avatar,
  userName,
  quote,
  movie,
  year,
  quoteImage,
}) => {
  return (
    <div className='text-white w-full px-6'>
      <div className='flex flex-row items-center'>
        <Image
          src={avatar ? avatar : '/assets/avatar-default.png'}
          alt='user headshot'
          width={512}
          height={512}
          className='h-11 w-auto mr-3'
        />
        <p>{userName}</p>
      </div>

      <div className='text-sm mt-3'>
        <p>{`"${quote}" - ${movie}, (${year})`}</p>
        <Image
          src={quoteImage}
          alt='user headshot'
          width={916}
          height={512}
          className='h-48 mt-3 rounded-lg'
        />
      </div>
    </div>
  );
};
export default NewsItem;
