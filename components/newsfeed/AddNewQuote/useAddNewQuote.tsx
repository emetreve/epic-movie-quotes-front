import { useUiContext } from '@/store';

const useAddNewQuote = () => {
  const { showAddQuote } = useUiContext();

  return { showAddQuote };
};
export default useAddNewQuote;
