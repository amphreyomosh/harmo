import { Fraunces, Poppins } from 'next/font/google';
import '../styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${fraunces.variable} ${poppins.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
