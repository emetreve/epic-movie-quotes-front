import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { AddCommentData } from '@/types';
import { createComment, getLike } from '@/services';
import { useQuotesContext } from '@/store';

const useNewsItem = () => {
  const { register, handleSubmit, reset } = useForm<AddCommentData>();

  const { searchedQuotes, setSearchedQuotes, quotesData, setQuotesData } =
    useQuotesContext();

  const queryClient = useQueryClient();

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
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const handleLike = async (authUserId: number, quote_id: number) => {
    try {
      const response = await getLike(authUserId, quote_id);
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
    } catch (error) {
      console.log(error);
    }
  };

  return { register, handleSubmit, onSubmit, handleLike };
};
export default useNewsItem;
