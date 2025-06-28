// components/Footer.js
import { useContext } from 'react';
import { SiteContext } from '../context/SiteContext';
import SocialLinks from './SocialLinks'; // <-- 1. Importamos el nuevo componente


export default function Footer() {
  const { profile } = useContext(SiteContext);
  const currentYear = new Date().getFullYear();
  const psychologistName = profile ? `${profile.user.first_name} ${profile.user.last_name}` : '';

  return (
    <footer className="bg-gray-100 text-center py-8 mt-12">
      {/* 2. Añadimos el componente de redes sociales aquí */}
      <SocialLinks />

      <p className="text-gray-600">
        &copy; {currentYear} Psicóloga {psychologistName}. Todos los derechos reservados.
      </p>
    </footer>
  );
}