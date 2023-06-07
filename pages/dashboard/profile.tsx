import Image from 'next/image';
import Link from 'next/link';
import { FormProvider } from 'react-hook-form';
import { useProfile } from '@/hooks';
import {
  Header,
  ChangeName,
  SuccessNotification,
  ChangePassword,
  ValidationIcons,
  PasswordConditionsBox,
} from '@/components';

const Profile = () => {
  const {
    logged,
    user,
    showEditName,
    showUpdateName,
    showSuccess,
    setShowSuccess,
    showUpdatePassword,
    showEditPassword,
    showUsernameInput,
    setShowUsernameInput,
    methods,
    handleSubmit,
    onSubmit,
    register,
    showPasswordInputs,
    setShowPasswordInputs,
    applyInputStyle,
    formState,
    hidePassword,
    setHidePassword,
    hidePasswordConfirmation,
    setHidePasswordConfirmation,
    errors,
    pass,
    handleUpload,
    selectedAvatar,
    avatarButtonTrigger,
  } = useProfile();

  if (logged) {
    return (
      <>
        {showEditName && <ChangeName />}

        {showEditPassword && <ChangePassword />}

        <div className='bg-gradient-violet min-h-screen relative pb-5 lg:pb-14'>
          <Header hideSearch={true} />

          {showSuccess && <SuccessNotification show={setShowSuccess} />}

          <div>
            <div className='hidden lg:flex text-white px-16 pt-10'>
              <div className='w-[25%]'>
                <div className='flex flex-row'>
                  <Image
                    src={
                      user.avatar
                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.avatar}`
                        : '/assets/avatar-default.png'
                    }
                    alt='user headshot'
                    width={512}
                    height={512}
                    className='h-16 w-16 mr-3 border-2 border-red rounded-[50%]'
                  />
                  <div className='ml-3 pt-1'>
                    <p className='text-xl'>Nino Tabagari</p>
                    <Link href='/dashboard/profile'>
                      <p className='text-gray-400'>Edit your profile</p>
                    </Link>
                  </div>
                </div>
                <div className='flex flex-row mt-9 ml-3'>
                  <Image
                    src='/assets/home-wht.png'
                    alt='home'
                    width={512}
                    height={462}
                    className='h-7 w-auto mr-3'
                  />
                  <Link href='/dashboard/newsfeed'>
                    <p className='text-xl inline-block ml-5 hover:cursor-pointer'>
                      News feed
                    </p>
                  </Link>
                </div>
                <div className='flex flex-row mt-10 ml-3'>
                  <Image
                    src='/assets/movie-camera.png'
                    alt='camera for shooting movies'
                    width={512}
                    height={462}
                    className='h-7 w-auto mr-3'
                  />
                  <p className='text-xl inline-block ml-5'>List of movies</p>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:hidden text-white lg:ml-[26.7%] lg:w-[46.2%] w-full static top-[9.5rem] lg:top-[8rem] lg:-mt-[12rem]'>
            <div>
              <Link href='/dashboard/newsfeed'>
                <Image
                  src='/assets/back-hd.png'
                  alt='go back'
                  width={520}
                  height={512}
                  className='w-[0.9rem] h-auto ml-[2rem] my-5'
                />
              </Link>
            </div>
            <div className='bg-violet bg-opacity-80 rounded-xl pt-6 pb-24 flex flex-col items-center'>
              <div className='flex flex-col items-center justify-center'>
                <Image
                  src={
                    user.avatar
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.avatar}`
                      : '/assets/avatar-default.png'
                  }
                  alt='user headshot'
                  width={512}
                  height={512}
                  className='h-36 w-36 rounded-[50%] mb-2'
                />
                <label htmlFor='fileInput' className='cursor-pointer'>
                  Upload new photo
                  <input
                    id='fileInput'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleUpload}
                  />
                </label>
              </div>
              <div className='mt-9 w-full px-6'>
                <div className='flex flex-col mt-1'>
                  <label htmlFor='username_read' className='mb-1 text-xs'>
                    Username
                  </label>
                  <div className='relative'>
                    <input
                      id='username_read'
                      placeholder={user.name}
                      readOnly
                      className={`bg-transparent w-full text-sm border-b pb-[1rem]  border-input-gray placeholder-white`}
                    />
                    <p
                      onClick={() => {
                        showUpdateName(true);
                      }}
                      className='absolute bottom-[1.2rem] text-sm text-input-gray w-5 h-5 hover:cursor-pointer block right-4'
                    >
                      Edit
                    </p>
                  </div>
                </div>
                <div className='flex flex-col mt-8'>
                  <label htmlFor='email_read' className='mb-1 text-xs'>
                    Email
                  </label>
                  <input
                    id='email_read'
                    readOnly
                    placeholder={user.email}
                    className={`bg-transparent w-full text-sm border-b pb-[1rem]  border-input-gray placeholder-white`}
                  />
                </div>
                {!user.is_google_user && (
                  <div className='flex flex-col mt-8'>
                    <label htmlFor='password_read' className='mb-1 text-xs'>
                      Password
                    </label>
                    <div className='relative'>
                      <input
                        id='password_read'
                        readOnly
                        className={`bg-transparent w-full text-sm border-b pb-[1rem]  border-input-gray placeholder-white`}
                      />
                      <Image
                        src='/assets/password.png'
                        alt='password'
                        width={512}
                        height={7552}
                        className='h-2 w-auto absolute bottom-[1.2rem]'
                      />
                      <p
                        onClick={() => {
                          showUpdatePassword(true);
                        }}
                        className='absolute bottom-[1.2rem] text-sm text-input-gray w-5 h-5 hover:cursor-pointer block right-4'
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='lg:block hidden'>
            <FormProvider {...methods}>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className='text-white ml-[30%] w-[40%] top-[8rem] -mt-[12rem]'>
                  <h1 className='text-2xl mb-5 block'>My profile</h1>
                  <div className='flex flex-col items-center justify-center'>
                    <Image
                      // src={
                      //   user.avatar
                      //     ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.avatar}`
                      //     : '/assets/avatar-default.png'
                      // }
                      src={
                        selectedAvatar
                          ? selectedAvatar
                          : user.avatar
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.avatar}`
                          : '/assets/avatar-default.png'
                      }
                      alt='user headshot'
                      width={512}
                      height={512}
                      className='h-36 w-36 rounded-[50%] mb-2'
                    />
                    <label htmlFor='fileInput' className='cursor-pointer'>
                      Upload new photo
                      <input
                        id='fileInput'
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleUpload}
                      />
                    </label>
                  </div>
                  <div className='-mt-[7.6rem] bg-profile-dark-blue backdrop-blur-25 rounded-xl pt-6 pb-36 flex flex-col items-center'>
                    <div className='mt-32 w-full px-44'>
                      <div className='flex flex-col mt-1 w-[100%]'>
                        <div className='flex justify-center items-center'>
                          <div className='flex-grow'>
                            <label
                              htmlFor='username_read_lg'
                              className='mb-1 text-xs'
                            >
                              Username
                            </label>
                            <input
                              id='username_read_lg'
                              placeholder={user.name}
                              readOnly
                              className='bg-input-gray mt-1 w-full py-2 rounded-md px-4 border-input-gray placeholder-txt-black'
                            />
                          </div>
                          <div
                            onClick={() => {
                              setShowUsernameInput(true);
                            }}
                            className='text-input-gray hover:cursor-pointer ml-8 pt-6'
                          >
                            Edit
                          </div>
                        </div>
                      </div>

                      {showUsernameInput && (
                        <div className=' flex flex-col mt-9 w-[87%]'>
                          <div className='flex justify-center items-center'>
                            <div className='flex-grow'>
                              <label
                                htmlFor='username'
                                className='mb-1 text-xs'
                              >
                                New username
                              </label>
                              <div className='relative'>
                                <input
                                  {...register('username', {
                                    minLength: {
                                      value: 3,
                                      message:
                                        'This field must have at least 3 characters.',
                                    },
                                    maxLength: {
                                      value: 15,
                                      message:
                                        "This field can't have more than 15 characters.",
                                    },
                                    pattern: {
                                      value: /^[a-z0-9]+$/,
                                      message:
                                        'Only lowercase letters and numbers are allowed.',
                                    },
                                  })}
                                  placeholder='Enter new username'
                                  id='username'
                                  className={`${
                                    applyInputStyle('username')
                                      ? 'border-red'
                                      : formState.dirtyFields['username']
                                      ? 'border-green'
                                      : ''
                                  } bg-input-gray border-2 text-txt-black mt-1 w-full py-2 rounded-md px-4 placeholder-gray`}
                                />
                                <div className='-mt-[0.15rem]'>
                                  <ValidationIcons name='username' />
                                </div>
                              </div>
                              <div className='h-2 pt-[0.3rem]'>
                                <p className='text-red text-xs'>
                                  {errors['username']?.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className='flex flex-col mt-9 w-[87%]'>
                        <div className='flex justify-center items-center'>
                          <div className='flex-grow'>
                            <label
                              htmlFor='email_read_lg'
                              className='mb-1 text-xs'
                            >
                              Email
                            </label>
                            <input
                              id='email_read_lg'
                              placeholder={user.email}
                              readOnly
                              className='bg-input-gray mt-1 w-full py-2 rounded-md px-4 border-input-gray placeholder-txt-black'
                            />
                          </div>
                        </div>
                      </div>
                      {!user.is_google_user && (
                        <>
                          <div className='flex flex-col mt-9 w-[100%]'>
                            <div className='flex justify-center items-center'>
                              <div className='flex-grow'>
                                <label
                                  htmlFor='password_read_lg'
                                  className='mb-1 text-xs'
                                >
                                  Password
                                </label>
                                <div className='relative'>
                                  <input
                                    id='password_read_lg'
                                    readOnly
                                    className='bg-input-gray mt-1  w-full py-2 rounded-md px-4 border-input-gray placeholder-txt-black'
                                  />
                                  <Image
                                    src='/assets/password-dark.png'
                                    alt='password'
                                    width={512}
                                    height={7552}
                                    className='h-2 ml-4 top-5 w-auto absolute bottom-[1.2rem]'
                                  />
                                </div>
                              </div>
                              <p
                                onClick={() => setShowPasswordInputs(true)}
                                className='text-input-gray hover:cursor-pointer ml-8 pt-6'
                              >
                                Edit
                              </p>
                            </div>
                          </div>
                          {showPasswordInputs && (
                            <div>
                              <div>
                                <PasswordConditionsBox />
                              </div>

                              <div className='flex flex-col mt-9 w-[87%]'>
                                <div className='flex justify-center items-center'>
                                  <div className='flex-grow'>
                                    <label
                                      htmlFor='password'
                                      className='mb-1 text-xs'
                                    >
                                      Password
                                    </label>
                                    <div className='relative'>
                                      <input
                                        type={
                                          hidePassword ? 'password' : 'text'
                                        }
                                        id='password'
                                        {...register('password', {
                                          minLength: {
                                            value: 8,
                                            message:
                                              'This field must have at least 8 characters.',
                                          },
                                          maxLength: {
                                            value: 15,
                                            message:
                                              "This field can't have more than 15 characters.",
                                          },
                                          pattern: {
                                            value: /^[a-z0-9]+$/,
                                            message:
                                              'Only lowercase letters and numbers are allowed.',
                                          },
                                        })}
                                        className={`${
                                          applyInputStyle('password')
                                            ? 'border-red'
                                            : formState.dirtyFields['password']
                                            ? 'border-green'
                                            : ''
                                        } bg-input-gray border-2 mt-1 w-full py-2 rounded-md px-4 text-txt-black`}
                                      />
                                      <div>
                                        <ValidationIcons
                                          name='password'
                                          password_related={true}
                                        />
                                      </div>
                                      <Image
                                        onClick={() => {
                                          setHidePassword((prev) => !prev);
                                        }}
                                        src='/assets/eye-password.png'
                                        alt='show password'
                                        width={200}
                                        height={200}
                                        className='absolute right-4 bottom-[0.7rem] w-4 h-4 hover:cursor-pointer'
                                      />
                                    </div>
                                    <div className='h-2 pt-[0.3rem]'>
                                      <p className='text-red text-xs'>
                                        {errors['password']?.message}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className='flex flex-col mt-9 w-[87%]'>
                                <div className='flex justify-center items-center'>
                                  <div className='flex-grow'>
                                    <label
                                      htmlFor='password_confirmation'
                                      className='mb-1 text-xs'
                                    >
                                      Confirm new password
                                    </label>
                                    <div className='relative'>
                                      <input
                                        type={
                                          hidePasswordConfirmation
                                            ? 'password'
                                            : 'text'
                                        }
                                        id='password_confirmation'
                                        {...register('password_confirmation', {
                                          validate: (value) =>
                                            value === pass ||
                                            'Passwords do not match.',
                                        })}
                                        className={`${
                                          applyInputStyle(
                                            'password_confirmation'
                                          )
                                            ? 'border-red'
                                            : formState.dirtyFields[
                                                'password_confirmation'
                                              ]
                                            ? 'border-green'
                                            : ''
                                        } bg-input-gray border-2 mt-1 w-full py-2 rounded-md px-4 text-txt-black`}
                                      />
                                      <div>
                                        <ValidationIcons
                                          name='password_confirmation'
                                          password_related={true}
                                        />
                                      </div>
                                      <Image
                                        onClick={() => {
                                          setHidePasswordConfirmation(
                                            (prev) => !prev
                                          );
                                        }}
                                        src='/assets/eye-password.png'
                                        alt='show password'
                                        width={200}
                                        height={200}
                                        className='absolute right-4 bottom-[0.7rem] w-4 h-4 hover:cursor-pointer'
                                      />
                                    </div>
                                    <div className='h-2 pt-[0.3rem]'>
                                      <p className='text-red text-xs'>
                                        {
                                          errors['password_confirmation']
                                            ?.message
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {(showUsernameInput ||
                    showPasswordInputs ||
                    avatarButtonTrigger) && (
                    <div className='flex flex-row'>
                      <p className='relative left-[32.5rem] mt-14 py-[0.6rem] text-input-gray'>
                        Cancell
                      </p>
                      <button className='text-white relative left-[35rem] mt-14 bg-red py-[0.6rem] px-4 text-lg rounded-md mr-5 hover:bg-red-hover'>
                        Save changes
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </>
    );
  }
};

export default Profile;
