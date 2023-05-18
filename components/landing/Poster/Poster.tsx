import Image from 'next/image';
import { PropsType } from './types';

const Poster: React.FC<PropsType> = (props) => {
  return (
    <div className='h-[30rem] relative lg:h-screen'>
      <div className='image-container'>
        <div className='absolute inset-0'>
          <Image
            src={props.image}
            alt='interstellar wallpaper'
            width={819}
            height={512}
            className='w-full h-full object-cover object-center'
          />
        </div>
      </div>
    </div>
  );
};
export default Poster;
