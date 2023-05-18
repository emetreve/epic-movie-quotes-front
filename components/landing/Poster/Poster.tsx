import Image from 'next/image';
import { PropsType } from './types';

const Poster: React.FC<PropsType> = (props) => {
  return (
    <div className='h-[27rem] relative lg:h-screen w-full'>
      <div className='image-container'>
        <div className='absolute inset-0'>
          <Image
            src={props.image}
            alt={props.alt}
            width={1440}
            height={900}
            className='w-full h-full object-cover object-center'
          />
        </div>
      </div>
      <div className='absolute top-10 text-white z-50 w-80 pl-6 pt-32'>
        <div className='flex flex-row'>
          <div>
            <div className='w-[15px] height-0 border border-white mr-3 mt-3'></div>
          </div>
          <div>
            <h1 className=' text-[1.08rem] font-montserrat'>
              &quot;{props.quote}&quot;
            </h1>
            <p className='text-sm pt-4'>{props.signature}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Poster;
