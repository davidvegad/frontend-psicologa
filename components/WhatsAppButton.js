// components/WhatsAppButton.js
import React, { useContext } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { WhatsAppContext } from '../context/WhatsAppContext';

const WhatsAppButton = () => {
  // Leemos la configuración actual del contexto
  const { whatsAppConfig } = useContext(WhatsAppContext);

  // Si no hay configuración (ni global ni de página), no mostramos nada.
  if (!whatsAppConfig?.default_whatsapp_number && !whatsAppConfig?.number) {
    return null;
  }
  
  // Usamos el número/mensaje específico del servicio, o el por defecto global
  const phoneNumber = whatsAppConfig.number || whatsAppConfig.default_whatsapp_number;
  const message = whatsAppConfig.message || whatsAppConfig.default_whatsapp_message || '';

  // Si después de todo no hay número, tampoco mostramos nada.
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