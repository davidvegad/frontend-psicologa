// components/layout.js

import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton'; // <-- 1. Importa el nuevo componente


// AÑADIMOS 'profile' a la lista de props que recibe la función
export default function Layout({ children, profile }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header profile={profile} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer profile={profile} />
	  
	  <WhatsAppButton /> {/* <-- 2. Añade el componente aquí */}
    </div>
  );
}