// components/WhatsAppButton.js

import React, { useContext } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { SiteContext } from '../context/SiteContext';

const WhatsAppButton = () => {
  const { pageWhatsAppConfig, siteSettings } = useContext(SiteContext);

  // Lógica de Prioridad:
  // 1. Usa el número/mensaje de la página actual si existe.
  // 2. Si no, usa el número/mensaje global por defecto.
  const phoneNumber = pageWhatsAppConfig?.number || siteSettings?.default_whatsapp_number;
  const message = pageWhatsAppConfig?.message || siteSettings?.default_whatsapp_message || '';

  // Si después de todo no hay un número de teléfono, no mostramos el botón.
  if (!phoneNumber) {
    return null;
  }

  //
  // ¡LA CORRECCIÓN ESTÁ AQUÍ! 
  // Asegúrate de que la línea siguiente use comillas invertidas (backticks) ` ` y no ' ' o " ".
  //
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