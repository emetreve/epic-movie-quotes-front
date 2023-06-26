export type PropsType = {
  authUserAvatar?: string;
  authUserName: string;
  whichQuote: number;
  setWhichQuote: Function;
  quoteData: {
    bodyEn: string;
    bodyKa: string;
    image?: string;
  } | null;
};
