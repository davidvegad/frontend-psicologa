// components/Header.js
import Link from 'next/link';
import { useContext } from 'react'; // Importamos useContext
import { SiteContext } from '../context/SiteContext'; // Importamos nuestro contexto

// El componente ya no necesita recibir props
export default function Header() {
  // Tomamos el perfil directamente del contexto global
  const { profile } = useContext(SiteContext);

  const psychologistName = profile ? `${profile.user.first_name} ${profile.user.last_name}` : '';

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Psicóloga {psychologistName}
        </Link>
        <div className="flex space-x-4">
          {/* ...tus enlaces... */}
          <Link href="/" className="text-gray-600 hover:text-blue-500">Inicio</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-500">Sobre Mí</Link>
          <Link href="/servicios" className="text-gray-600 hover:text-blue-500">Servicios</Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-500">Blog</Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-500">Contacto</Link>
        </div>
      </nav>
    </header>
  );
}