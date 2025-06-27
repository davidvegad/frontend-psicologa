// components/Layout.js
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

// El Layout ya no necesita recibir 'profile'
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}