// components/Footer.js
import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';

export default function Footer() {
  const { profile } = useContext(SiteContext); // Tomamos el perfil del contexto
  const currentYear = new Date().getFullYear();
  const psychologistName = profile ? `${profile.user.first_name} ${profile.user.last_name}` : '';

  return (
    <footer className="bg-gray-100 text-center py-6 mt-12">
      <p className="text-gray-600">
        &copy; {currentYear} Psicóloga {psychologistName}. Todos los derechos reservados.
      </p>
    </footer>
  );
}