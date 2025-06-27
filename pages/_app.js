// pages/_app.js
import { Lora, Inter } from 'next/font/google';
import Layout from '../components/Layout';
import { WhatsAppProvider } from '../context/WhatsAppContext'; // <-- 1. Importar
import '../styles/globals.css';

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

function MyApp({ Component, pageProps }) {
  const { profile, siteSettings } = pageProps;
  return (
    <div className={`${lora.variable} ${inter.variable} font-sans`}>
      {/* 2. Envolver todo con el proveedor */}
      <WhatsAppProvider defaultConfig={siteSettings}>
        <Layout profile={pageProps.profile}>
          <Component {...pageProps} />
        </Layout>
      </WhatsAppProvider>
    </div>
  );
}

export default MyApp;