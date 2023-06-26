import { useQuery } from 'react-query';
import { getQuote } from '@/services';
import { useForm } from 'react-hook-form';

const useEditQuote = (whichQuote: number) => {
  const fetchQuote = async () => {
    try {
      const response = await getQuote(whichQuote);
      return response.data;
    } catch {
      // router.push('/404');
    }
  };

  const { data: quote } = useQuery('editquote', fetchQuote, {
    enabled: !!whichQuote,
  });

  const methods = useForm({
    defaultValues: {
      bodyEn: quote?.body?.en || '',
      bodyKa: quote?.body?.ka || '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return { quote, register, errors, handleSubmit, onSubmit };
};
export default useEditQuote;
