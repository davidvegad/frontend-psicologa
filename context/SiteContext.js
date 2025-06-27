// context/SiteContext.js
import { createContext, useState, useEffect } from 'react';

// 1. Creamos el contexto
export const SiteContext = createContext();

// 2. Creamos un "Proveedor" que obtendrá los datos globales UNA SOLA VEZ
export const SiteProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [siteSettings, setSiteSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // Hacemos las dos peticiones globales en paralelo
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
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // Pasamos los datos y el estado de carga a todos los componentes hijos
  const value = { profile, siteSettings, isLoadingGlobal: isLoading };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};