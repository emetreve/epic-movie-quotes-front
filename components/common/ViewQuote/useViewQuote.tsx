import { useForm } from 'react-hook-form';
import { AddCommentData } from '@/types';
import { createComment, getLike, deleteQuote } from '@/services';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { getQuote } from '@/services';
import { useTranslation } from 'next-i18next';

const useViewQuote = (
  whichQuoteToView: number,
  setWhichQuoteToView: Function,
  setWhichQuoteToEdit: Function,
  setEditQuoteData: Function
) => {
  const { register, handleSubmit, reset } = useForm<AddCommentData>();

  const { t } = useTranslation(['movie', 'newsfeed', 'profile']);

  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchQuote = async () => {
    try {
      const response = await getQuote(whichQuoteToView);
      return response.data;
    } catch {
      router.push('/404');
    }
  };

  const onSubmit = async (data: AddCommentData) => {
    try {
      createComment(data);
      queryClient.invalidateQueries('quote');
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const handleLike = async (authUserId: number, quote_id: number) => {
    try {
      await getLike(authUserId, quote_id);
      queryClient.invalidateQueries('quote');
    } catch (error) {
      console.log(error);
    }
  };

  const handleBringScroll = () => {
    document.body.classList.remove('screenHeight');
  };

  const handleDelete = async (id: number) => {
    await deleteQuote(id);
    setWhichQuoteToView(null);
    handleBringScroll();
    queryClient.invalidateQueries('movie');
  };

  const handleClose = () => {
    setWhichQuoteToView(null);
    handleBringScroll();
  };

  const { data: quote } = useQuery('quote', fetchQuote, {
    enabled: !!whichQuoteToView,
  });

  const handleEdit = (id: number) => {
    setWhichQuoteToView(null);
    setEditQuoteData({
      bodyEn: quote.body.en,
      bodyKa: quote.body.ka,
      image: quote.image,
    });
    setWhichQuoteToEdit(id);
  };

  return {
    handleBringScroll,
    register,
    handleSubmit,
    quote,
    onSubmit,
    handleLike,
    handleDelete,
    handleClose,
    handleEdit,
    t,
  };
};
export default useViewQuote;
