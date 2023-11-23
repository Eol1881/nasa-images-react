import { Pixelify_Sans } from 'next/font/google';
import Head from 'next/head';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NASA Images',
  description: 'My App is a...',
};

const pixelify = Pixelify_Sans({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>About</title>
        <link rel="icon" type="image/svg+xml" href="nasa-logo.svg" />
      </Head>
      <div className={`container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2 ${pixelify.className}`}>
        <h1>ITS ABOUT PAGE</h1>
      </div>
    </>
  );
}
