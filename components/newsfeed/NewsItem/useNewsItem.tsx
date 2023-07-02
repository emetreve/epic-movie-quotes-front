import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AddCommentData } from '@/types';
import { createComment, getLike } from '@/services';
import { useQuotesContext } from '@/store';
import { useTranslation } from 'next-i18next';

const useNewsItem = () => {
  const { register, handleSubmit, reset } = useForm<AddCommentData>();

  const { searchedQuotes, setSearchedQuotes, quotesData, setQuotesData } =
    useQuotesContext();

  const { t } = useTranslation('newsfeed');

  const createCommentMutation = useMutation(createComment);

  const onSubmit = async (data: AddCommentData) => {
    try {
      const response = await createCommentMutation.mutateAsync(data);
      const updatedQuote = { ...response.data };

      if (searchedQuotes.length > 0) {
        const updatedQuotes = searchedQuotes.map((quote) =>
          quote.id === updatedQuote.id ? updatedQuote : quote
        );
        setSearchedQuotes(updatedQuotes);
      } else {
        const updatedQuotes = quotesData.map((quote) =>
          quote.id === updatedQuote.id ? updatedQuote : quote
        );
        setQuotesData(updatedQuotes);
      }
    } catch (error) {}
    reset();
  };

  const handleLike = async (authUserId: number, quote_id: number) => {
    try {
      await getLike(authUserId, quote_id);
    } catch (error) {}
  };

  return { register, handleSubmit, onSubmit, handleLike, t };
};
export default useNewsItem;
