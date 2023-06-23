import { useState } from 'react';
import { useRouter } from 'next/router';
import { deleteQuote } from '@/services';
import { useQueryClient } from 'react-query';

const useQuoteListing = (quoteId: number) => {
  const [showOptions, setShowOptions] = useState(false);
  const { locale } = useRouter();
  const queryClient = useQueryClient();

  const handleViewOptions = () => {
    setShowOptions(!showOptions);
    console.log(quoteId);
  };

  const handleDelete = async () => {
    try {
      await deleteQuote(quoteId);
      setShowOptions(false);
      queryClient.invalidateQueries('movie');
    } catch (error) {
      console.log(error);
    }
  };

  return { locale, handleViewOptions, showOptions, handleDelete };
};
export default useQuoteListing;
