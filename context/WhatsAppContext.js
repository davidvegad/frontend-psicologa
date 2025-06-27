// context/WhatsAppContext.js
import { createContext, useState } from 'react';

export const WhatsAppContext = createContext();

// Ahora el proveedor acepta un prop 'defaultConfig'
export const WhatsAppProvider = ({ children, defaultConfig }) => {
  // El estado se inicializa con la configuración por defecto que le pasamos
  const [whatsAppConfig, setWhatsAppConfig] = useState(defaultConfig); 

  return (
    <WhatsAppContext.Provider value={{ whatsAppConfig, setWhatsAppConfig }}>
      {children}
    </WhatsAppContext.Provider>
  );
};