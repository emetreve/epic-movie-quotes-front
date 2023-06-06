const PasswordConditionsBox = () => {
  return (
    <div className='pl-6 bg-transparent border mt-8 lg:w-[87%] py-5 border-password-box-border rounded'>
      <p>Passwords should contain:</p>
      <ul className='list-disc list-inside mt-2'>
        <li className='flex items-center'>
          <span className='w-1 h-1 rounded-full bg-gray-500 mr-2'></span>
          <span className='text-xs text-gray-500'>8 or more characters</span>
        </li>
        <li className='flex items-center mt-1'>
          <span className='w-1 h-1 rounded-full bg-green mr-2'></span>
          <span className='text-xs'>15 lowercase characters</span>
        </li>
      </ul>
    </div>
  );
};

export default PasswordConditionsBox;
