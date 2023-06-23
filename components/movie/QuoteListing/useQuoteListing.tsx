import { useRouter } from 'next/router';

const useQuoteListing = (quoteId: number) => {
  const { locale } = useRouter();

  const handleViewOptions = () => {
    console.log(quoteId);
  };
  return { locale, handleViewOptions };
};
export default useQuoteListing;
