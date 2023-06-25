const useViewQuote = (whichQuoteToView: number) => {
  console.log(whichQuoteToView);

  const handleBringScroll = () => {
    document.body.classList.remove('screenHeight');
  };

  return { handleBringScroll };
};
export default useViewQuote;
