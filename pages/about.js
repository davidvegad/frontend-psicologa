// pages/about.js (Ejemplo)
import { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { SiteContext } from '../context/SiteContext'; // Importamos nuestro contexto


export default function AboutPage() {
  // Tomamos el perfil y el estado de carga directamente del contexto global
  const { profile, isLoadingGlobal } = useContext(SiteContext);

  // Mostramos un estado de carga mientras los datos globales se obtienen
  if (isLoadingGlobal) {
    return <div className="text-center py-20">Cargando información...</div>;
  }

  // Si no hay perfil, mostramos un mensaje
  if (!profile) {
    return <div className="text-center py-20">No se pudo cargar la información del perfil.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Sobre Mí - {`${profile.user.first_name} ${profile.user.last_name}`}</title>
      </Head>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 font-serif text-brand-secondary">Conóceme</h1>
          {profile.photo_url && (
            <div className="inline-block relative mb-10">
              <Image 
                src={profile.photo_url} 
                alt={`Foto de ${profile.user.first_name}`}
                width={200}
                height={200}
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
          )}
        </div>
        
        <div className="prose lg:prose-xl max-w-none">
          <h2 className="font-serif text-3xl text-brand-secondary">Mi Biografía</h2>
          <p>{profile.bio}</p>
          <br/>
          <h2 className="font-serif text-3xl text-brand-secondary">Mi Filosofía de Trabajo</h2>
          <p>{profile.philosophy}</p>
        </div>
      </div>
    </div>
  );
}