import { createContext, useContext, useState } from 'react';
import { PropsType } from './types';
import { Quote } from '@/types';

const QuotesContext = createContext({
  searchedQuotes: [] as Quote[],
  setSearchedQuotes: (value: Quote[]) => {},
  quotesData: [] as Quote[],
  setQuotesData: (value: Quote[]) => {},
});

export const QuotesContextProvider: React.FC<PropsType> = ({ children }) => {
  const [searchedQuotes, setSearchedQuotes] = useState<Quote[]>([]);
  const [quotesData, setQuotesData] = useState<Quote[]>([]);
  return (
    <QuotesContext.Provider
      value={{ searchedQuotes, setSearchedQuotes, quotesData, setQuotesData }}
    >
      {children}
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => useContext(QuotesContext);
