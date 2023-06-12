import { useForm } from 'react-hook-form';

const useNewsItem = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return { register, handleSubmit, onSubmit };
};
export default useNewsItem;
