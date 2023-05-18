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
      <div
        className={`absolute text-white z-50 w-[21rem] lg:w-[64rem] pl-6 ${
          props.mobileTop ? props.mobileTop : 'pt-36'
        } lg:pl-40  ${props.desktopTop ? props.desktopTop : 'lg:pt-72'}`}
      >
        <div className='flex flex-row'>
          <div>
            <div className='w-[0.9375rem] lg:w-[2.125rem] height-0 border border-white mr-3 mt-3 lg:mt-8 lg:mr-5'></div>
          </div>
          <div>
            <h1 className='text-[1.1rem] font-montserrat lg:text-5xl lg:leading-[1.4]'>
              &quot;{props.quote}&quot;
            </h1>
            <p className='text-sm pt-4 lg:text-2xl'>{props.signature}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Poster;
