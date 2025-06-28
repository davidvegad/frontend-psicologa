// pages/_app.js
import { useEffect } from 'react'; // <-- 1. Importar useEffect
import { Lora, Inter } from 'next/font/google';
import Layout from '../components/Layout';
import { SiteProvider } from '../context/SiteContext';

import 'aos/dist/aos.css'; // <-- 2. Importar los estilos de AOS
import AOS from 'aos'; // <-- 3. Importar la librería AOS

import '../styles/globals.css';

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

function MyApp({ Component, pageProps }) {
  // 4. Añadir este useEffect para inicializar AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // Duración de la animación en milisegundos
      once: true, // Si la animación debe ocurrir solo una vez
      offset: 100, // Distancia desde el borde para empezar la animación
    });
  }, []);

  return (
    <div className={`${lora.variable} ${inter.variable} font-sans`}>
      <SiteProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SiteProvider>
    </div>
  );
}

export default MyApp;