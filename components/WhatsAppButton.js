// components/WhatsAppButton.js
import React, { useContext } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { SiteContext } from '../context/SiteContext'; // <-- Usamos el nuevo SiteContext

const WhatsAppButton = () => {
  // Ahora obtenemos siteSettings del contexto global
  const { siteSettings } = useContext(SiteContext);

  const phoneNumber = siteSettings?.default_whatsapp_number;
  const message = siteSettings?.default_whatsapp_message || '';

  // Si no hay un número de teléfono global, no mostramos el botón
  if (!phoneNumber) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 rounded-full text-white shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-110"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsAppButton;