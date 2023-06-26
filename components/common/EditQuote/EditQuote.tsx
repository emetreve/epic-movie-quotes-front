import Image from 'next/image';
import { PropsType } from './types';
import useEditQuote from './useEditQuote';

const EditQuote: React.FC<PropsType> = ({
  authUserAvatar,
  authUserName,
  whichQuote,
  setWhichQuote,
  quoteData,
}) => {
  const {
    quote,
    register,
    errors,
    handleSubmit,
    onSubmit,
    handleUpload,
    uploadedImageToDisplay,
    handleDelete,
  } = useEditQuote(whichQuote, setWhichQuote, quoteData);

  return (
    <div className='z-50 lg:pb-16 bg-profile-dark-blue overflow-auto h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'>
      {quote?.body && (
        <div className='h-full fixed lg:top-[5rem] lg:bg-profile-dark-blue w-full lg:h-fit lg:pb-10 lg:w-[50rem] lg:rounded-2xl lg:scale-105'>
          <div className='pt-6 px-4 flex flex-row items-center justify-center border-b border-gray-700 pb-6'>
            <Image
              onClick={() => {
                handleDelete(quote.id);
              }}
              src='/assets/delete.png'
              alt='delete quote'
              width={70}
              height={80}
              className='h-[1.06rem] absolute left-8 w-auto hover:cursor-pointer'
            />
            <div>
              <p className='block'>Edit quote</p>
            </div>
            <Image
              src='/assets/close-thin.png'
              alt='close modal'
              width={512}
              height={512}
              className='w-[0.9rem] h-[0.9rem] hover:cursor-pointer absolute right-8'
              onClick={() => {
                setWhichQuote(null);
              }}
            />
          </div>
          <div className='flex flex-row items-center lg:mb-4 mt-6 px-6 mb-3'>
            <Image
              src={
                authUserAvatar
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${authUserAvatar}`
                  : '/assets/avatar-default.png'
              }
              alt='user headshot'
              width={512}
              height={512}
              className='h-11 w-auto mr-3 lg:h-14 rounded-[50%]'
            />
            <p className='lg:text-xl lg:block lg:ml-1'>{authUserName}</p>
          </div>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className='relative'>
              <div className='relative w-full px-6'>
                <div className='flex items-center min-h-[5.8rem] overflow-hidden focus:outline-none border border-textarea-gray bg-transparent rounded px-4'>
                  <textarea
                    {...register('bodyEn', {
                      required: `${'This field is required'}`,
                      pattern: {
                        value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                        message: `${'Only English text allowed'}`,
                      },
                    })}
                    className='absolute w-full pl-2 lg:pr-[8rem] pr-[7rem] focus:outline-none bg-transparent'
                  />
                </div>
                <p className='absolute top-3 right-9 text-textarea-gray'>Eng</p>
                <div className='h-2'>
                  <p className='text-red text-xs'>
                    {errors.bodyEn && String(errors.bodyEn.message)}
                  </p>
                </div>
              </div>

              <div className='relative w-full px-6 mt-3'>
                <div className='flex items-center min-h-[5.8rem] overflow-hidden focus:outline-none border border-textarea-gray bg-transparent rounded px-4'>
                  <textarea
                    {...register('bodyKa', {
                      required: `${'This field is required'}`,
                      pattern: {
                        value: /^[ა-ჰ\d,.()\s$?!#:@%^&*"']+$/,
                        message: `${'Only Georgian text allowed'}`,
                      },
                    })}
                    className='absolute w-full pl-2 lg:pr-[8rem] pr-[7rem] focus:outline-none bg-transparent'
                  />
                </div>
                <p className='absolute top-3 right-9 text-textarea-gray'>ქარ</p>
                <div className='h-2'>
                  <p className='text-red text-xs'>
                    {errors.bodyKa && String(errors.bodyKa.message)}
                  </p>
                </div>
              </div>

              <div className='relative text-sm mt-1 lg:text-xl break-all px-6'>
                <div className='flex flex-col'>
                  <Image
                    src={
                      uploadedImageToDisplay.length > 0
                        ? `${uploadedImageToDisplay}`
                        : quote?.image
                        ? `${quote.full_url}`
                        : '/assets/quote-sample.png'
                    }
                    alt='quote image'
                    width={916}
                    height={512}
                    className='h-[16rem] lg:h-[25rem] mt-3 lg:mt-6 rounded-lg'
                  />

                  <label className='absolute top-[6rem] lg:top-[11rem] left-[7.5rem] lg:left-[19rem] w-[8rem] h-[5rem] rounded-xl lg:ml-4 bg-violet bg-opacity-70 py-2 lg:px-[0.7rem] px-[0.4rem] cursor-pointer'>
                    <div className='flex flex-col items-center justify-center pt-2 lg:pt-1'>
                      <Image
                        src='/assets/photo-camera.png'
                        alt='photo camera'
                        width={512}
                        height={512}
                        className='h-6 w-6 mr-3 mb-2 ml-2'
                      />
                      <span className='text-xs lg:text-base'>Change photo</span>
                    </div>
                    <input
                      {...register('image')}
                      name='image'
                      onChange={(e) => {
                        handleUpload(e);
                      }}
                      type='file'
                      className='relative inset-0 h-full opacity-0 cursor-pointer'
                    />
                  </label>
                </div>

                <button
                  className='text-white mb-[4rem] lg:mb-12 w-full lg:mt-8 mt-10 text-lg bg-red py-2 px-4 rounded-md hover:bg-red-hover'
                  type='submit'
                >
                  Edit quote
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditQuote;
