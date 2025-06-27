// pages/_app.js
import { Lora, Inter } from 'next/font/google';
import Layout from '../components/Layout';
import { SiteProvider } from '../context/SiteContext'; // Importamos el nuevo proveedor
import '../styles/globals.css';

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${lora.variable} ${inter.variable} font-sans`}>
      {/* El SiteProvider ahora se encarga de obtener los datos globales */}
      <SiteProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SiteProvider>
    </div>
  );
}

export default MyApp;