// context/SiteContext.js
import { createContext, useState, useEffect } from 'react';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  // Estados para los datos globales
  const [profile, setProfile] = useState(null);
  const [siteSettings, setSiteSettings] = useState(null);

  // ESTADO NUEVO: para la configuración específica de la página actual
  const [pageWhatsAppConfig, setPageWhatsAppConfig] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const [profileRes, settingsRes] = await Promise.all([
          fetch(`${apiUrl}/profile/1/`),
          fetch(`${apiUrl}/settings/`),
        ]);
        const profileData = await profileRes.json();
        const settingsData = await settingsRes.json();
        setProfile(profileData);
        setSiteSettings(settingsData);
      } catch (error) {
        console.error("Error fetching global data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGlobalData();
  }, []);

  // Pasamos tanto los datos globales como el estado específico de la página
  const value = { 
    profile, 
    siteSettings, 
    pageWhatsAppConfig, // <-- Pasamos el estado
    setPageWhatsAppConfig, // <-- Pasamos la función para cambiarlo
    isLoadingGlobal: isLoading 
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};