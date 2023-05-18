import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='font-helvetica-light-en'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
