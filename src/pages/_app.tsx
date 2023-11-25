import '@/styles/globals.css';
import { PixelifyFont } from '@/assets/fonts';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2 ${PixelifyFont.className}`}>
      <Component {...pageProps} />;
    </div>
  );
}
