import Image from 'next/image';
import { FormProvider } from 'react-hook-form';
import { useProfile } from '@/hooks';
import {
  Header,
  ChangeName,
  SuccessNotification,
  ChangePassword,
  ValidationIcons,
  PasswordConditionsBox,
  ChangeEmail,
} from '@/components';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SideProfilePanel } from '@/components';

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
    setSelectedAvatar,
    avatarButtonTrigger,
    showMobileAvatarModal,
    setShowMobileAvatarModal,
    submitMobileAvatarChange,
    handleCancelLg,
    handleOutsideClick,
    handleBack,
    showUpdateEmail,
    showEditEmail,
    t,
  } = useProfile();

  if (logged) {
    return (
      <>
        {showEditName && (
          <ChangeName userName={user.name} authUserId={user.id} />
        )}

        {showEditEmail && (
          <ChangeEmail userName={user.name} authUserId={user.id} />
        )}

        {showEditPassword && (
          <ChangePassword userName={user.name} authUserId={user.id} />
        )}

        <div
          onClick={handleOutsideClick}
          className='bg-gradient-violet min-h-screen relative pb-5 lg:pb-14'
        >
          <div className='h-[5rem]'>
            <Header
              hideSearch={true}
              userName={user.name}
              avatar={user.avatar}
              authUserId={user.id}
            />
          </div>

          {showSuccess && <SuccessNotification show={setShowSuccess} />}

          <SideProfilePanel avatar={user.avatar} name={user.name} />

          {!showMobileAvatarModal && (
            <div className='lg:hidden text-white lg:ml-[26.7%] lg:w-[46.2%] w-full static top-[9.5rem] lg:top-[8rem] lg:-mt-[12rem]'>
              <div
                onClick={() => {
                  handleBack('newsfeed');
                }}
              >
                <Image
                  src='/assets/back-hd.png'
                  alt='go back'
                  width={520}
                  height={512}
                  className='w-[0.9rem] h-auto ml-[2rem] my-5'
                />
              </div>
              <div className='bg-violet bg-opacity-80 rounded-xl pt-6 pb-20 flex flex-col items-center'>
                <div className='flex flex-col items-center justify-center'>
                  <Image
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
                  <label htmlFor='fileInputMobile' className='cursor-pointer'>
                    {t('Upload new photo')}
                    <input
                      id='fileInputMobile'
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={(e) => {
                        handleUpload(e);
                        setShowMobileAvatarModal(true);
                      }}
                    />
                  </label>
                </div>

                <div className='mt-9 w-full px-6'>
                  <div className='flex flex-col mt-1'>
                    <label htmlFor='username_read' className='mb-1 text-xs'>
                      {t('Username')}
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
                        {t('Edit')}
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-col mt-8'>
                    <label htmlFor='username_read' className='mb-1 text-xs'>
                      {t('Email')}
                    </label>
                    <div className='relative'>
                      <input
                        id='email_read'
                        placeholder={user.email}
                        readOnly
                        className={`bg-transparent w-full text-sm border-b pb-[1rem]  border-input-gray placeholder-white`}
                      />
                      <p
                        onClick={() => {
                          showUpdateEmail(true);
                        }}
                        className={`absolute ${
                          user.is_google_user && 'hidden'
                        } bottom-[1.2rem] text-sm text-input-gray w-5 h-5 hover:cursor-pointer block right-4`}
                      >
                        {t('Edit')}
                      </p>
                    </div>
                  </div>

                  {!user.is_google_user && (
                    <div className='flex flex-col mt-8'>
                      <label htmlFor='password_read' className='mb-1 text-xs'>
                        {t('Password')}
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
                          {t('Edit')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showMobileAvatarModal && (
            <div className='rounded-lg flex flex-col items-center justify-center h-[11rem] mt-20 bg-gradient-gray mx-8'>
              <p className='text-white pb-8 text-sm pt-10 text-center'>
                {t('Are you sure to make changes')}
              </p>
              <div className='border-b border-b-gray-600 w-full'></div>
              <div className='flex justify-between w-full'>
                <p
                  onClick={() => {
                    setShowMobileAvatarModal(false);
                    setSelectedAvatar('');
                  }}
                  className='text-input-gray hover:cursor-pointer mt-5 ml-5 py-[0.4rem]'
                >
                  {t('Cancel')}
                </p>
                <button
                  onClick={() => {
                    submitMobileAvatarChange();
                    setShowMobileAvatarModal(false);
                  }}
                  className='font-light text-xs text-white mt-5 mr-5 bg-red py-[0.4rem] px-2 rounded-md hover:bg-red-hover'
                >
                  {t('Confirm')}
                </button>
              </div>
            </div>
          )}

          <div className='lg:block hidden'>
            <FormProvider {...methods}>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className='text-white ml-[30%] w-[43%] top-[8rem] -mt-[12rem]'>
                  <h1 className='text-2xl mb-5 block'>{t('My profile')}</h1>
                  <div className='flex flex-col items-center justify-center'>
                    <Image
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
                      {t('Upload new photo')}
                      <input
                        id='fileInput'
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleUpload}
                      />
                    </label>
                  </div>
                  <div className='-mt-[7.6rem] pr-10 bg-profile-dark-blue backdrop-blur-25 rounded-xl pt-6 pb-36 flex flex-col items-center'>
                    <div className='mt-32 w-full px-40'>
                      <div className='flex flex-col mt-1 w-[100%]'>
                        <div className='flex justify-center items-center'>
                          <div className='flex-grow'>
                            <label
                              htmlFor='username_read_lg'
                              className='mb-1 text-xs'
                            >
                              {t('Username')}
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
                            className='text-input-gray hover:cursor-pointer ml-8 pt-6 w-2'
                          >
                            {t('Edit')}
                          </div>
                        </div>
                      </div>

                      {showUsernameInput && (
                        <div className=' flex flex-col mt-9 w-full'>
                          <div className='flex justify-center items-center'>
                            <div className='flex-grow'>
                              <label
                                htmlFor='username'
                                className='mb-1 text-xs'
                              >
                                {t('New username')}
                              </label>
                              <div className='relative'>
                                <input
                                  {...register('username', {
                                    minLength: {
                                      value: 3,
                                      message: `${t(
                                        'This field must have at least 3 characters'
                                      )}`,
                                    },
                                    maxLength: {
                                      value: 15,
                                      message: `${t(
                                        "This field can't have more than 15 characters"
                                      )}`,
                                    },
                                    pattern: {
                                      value: /^[a-z0-9]+$/,
                                      message: `${t(
                                        'Only lowercase letters and numbers are allowed'
                                      )}`,
                                    },
                                  })}
                                  placeholder={`${t('Enter new username')}`}
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
                            <div className='w-2 ml-8 pt-6'></div>
                          </div>
                        </div>
                      )}

                      <div className='flex flex-col mt-9 w-full'>
                        <div className='flex justify-center items-center'>
                          <div className='flex-grow'>
                            <label
                              htmlFor='email_read_lg'
                              className='mb-1 text-xs'
                            >
                              {t('Email')}
                            </label>
                            <input
                              id='email_read_lg'
                              placeholder={user.email}
                              readOnly
                              className='bg-input-gray mt-1 w-full py-2 rounded-md px-4 border-input-gray placeholder-txt-black'
                            />
                          </div>
                          <div className='w-2 ml-8 pt-6'></div>
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
                                  {t('Password')}
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
                                className='text-input-gray hover:cursor-pointer ml-8 pt-6 w-2'
                              >
                                {t('Edit')}
                              </p>
                            </div>
                          </div>
                          {showPasswordInputs && (
                            <div>
                              <div className='flex flex-col mt-9 w-[100%]'>
                                <div className='flex justify-center items-center'>
                                  <div className='flex-grow'>
                                    <PasswordConditionsBox />
                                  </div>
                                  <div className='w-2 ml-8 pt-6'></div>
                                </div>
                              </div>
                              <div className='flex flex-col mt-9 w-full'>
                                <div className='flex justify-center items-center'>
                                  <div className='flex-grow'>
                                    <label
                                      htmlFor='password'
                                      className='mb-1 text-xs'
                                    >
                                      {t('Password')}
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
                                            message: `${t(
                                              'This field must have at least 8 characters'
                                            )}`,
                                          },
                                          maxLength: {
                                            value: 15,
                                            message: `${t(
                                              "This field can't have more than 15 characters"
                                            )}`,
                                          },
                                          pattern: {
                                            value: /^[a-z0-9]+$/,
                                            message: `${t(
                                              'Only lowercase letters and numbers are allowed'
                                            )}`,
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
                                  <div className='w-2 ml-8 pt-6'></div>
                                </div>
                              </div>

                              <div className='flex flex-col mt-7 w-full'>
                                <div className='flex justify-center items-center'>
                                  <div className='flex-grow'>
                                    <label
                                      htmlFor='password_confirmation'
                                      className='mb-1 text-xs'
                                    >
                                      {t('Confirm new password')}
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
                                            `${t('Passwords do not match')}`,
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
                                  <div className='w-2 ml-8 pt-6'></div>
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
                    <div className='container flex justify-end'>
                      <div className='flex flex-row w-fit'>
                        <p
                          onClick={handleCancelLg}
                          className='mt-14 py-[0.6rem] text-input-gray mr-6'
                        >
                          {t('Cancel')}
                        </p>
                        <button className='text-white mt-14 bg-red py-[0.6rem] px-4 text-lg rounded-md mr-5 hover:bg-red-hover'>
                          {t('Save changes')}
                        </button>
                      </div>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'profile',
        'newsfeed',
      ])),
    },
  };
};
