import { useRouter } from 'next/router';
import { deleteQuote } from '@/services';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'next-i18next';

const useQuoteListing = (
  quoteId: number,
  setWhichModalOpen: Function,
  whichModalOpen: number | null
) => {
  const { locale } = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation(['movies']);

  const handleViewOptions = () => {
    if (whichModalOpen === quoteId) {
      setWhichModalOpen(null);
    } else {
      setWhichModalOpen(quoteId);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuote(quoteId);
      queryClient.invalidateQueries('movie');
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveBackgroundScroll = () => {
    document.body.classList.add('screenHeight');
  };

  return {
    locale,
    handleDelete,
    handleViewOptions,
    handleRemoveBackgroundScroll,
    t,
  };
};
export default useQuoteListing;
