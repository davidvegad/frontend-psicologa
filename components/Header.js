// components/Header.js
import Link from 'next/link';
import { useContext, useState } from 'react'; // Importamos useContext y useState
import { useRouter } from 'next/router';
import { SiteContext } from '../context/SiteContext'; // Importamos nuestro contexto

// El componente ya no necesita recibir props
export default function Header() {
  // Tomamos el perfil directamente del contexto global
  const { profile } = useContext(SiteContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const psychologistName = profile ? `${profile.user.first_name} ${profile.user.last_name}` : '';

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800" onClick={handleLinkClick}>
          Psicóloga {psychologistName}
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {/* Icono de hamburguesa */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
        <div className={`md:flex items-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          {/* ...tus enlaces... */}
          <Link href="/" className={`block md:inline-block hover:text-blue-500 ${router.pathname === '/' ? 'text-blue-500' : 'text-gray-600'}`} onClick={handleLinkClick}>Inicio</Link>
          <Link href="/about" className={`block md:inline-block hover:text-blue-500 ${router.pathname === '/about' ? 'text-blue-500' : 'text-gray-600'}`} onClick={handleLinkClick}>Sobre Mí</Link>
          <Link href="/servicios" className={`block md:inline-block hover:text-blue-500 ${router.pathname === '/servicios' ? 'text-blue-500' : 'text-gray-600'}`} onClick={handleLinkClick}>Servicios</Link>
          <Link href="/blog" className={`block md:inline-block hover:text-blue-500 ${router.pathname === '/blog' ? 'text-blue-500' : 'text-gray-600'}`} onClick={handleLinkClick}>Blog</Link>
          <Link href="/contact" className={`block md:inline-block hover:text-blue-500 ${router.pathname === '/contact' ? 'text-blue-500' : 'text-gray-600'}`} onClick={handleLinkClick}>Contacto</Link>
        </div>
      </nav>
    </header>
  );
}