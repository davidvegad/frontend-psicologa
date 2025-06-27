// components/Header.js
import Link from 'next/link';

// 1. El componente ahora recibe 'profile' como un "prop"
export default function Header({ profile }) {

  // 2. Se crea una variable para el nombre.
  //    Si el perfil existe, se usa el nombre completo. Si no, un texto por defecto.
  const psychologistName = profile ? `${profile.user.first_name} ${profile.user.last_name}` : '[Nombre]';

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/*
          Pasa la clase directamente al componente Link.
          Next.js se encargará de ponerla en la etiqueta <a> final.
        */}
        {/* 3. Se usa la variable para mostrar el nombre dinámicamente */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          Psicóloga {psychologistName}
        </Link>
        <div className="flex space-x-4">
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