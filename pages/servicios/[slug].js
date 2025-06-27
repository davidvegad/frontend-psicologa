// pages/servicios/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

export default function ServiceDetailPage() {
  const router = useRouter();
  const { slug } = router.query; // Obtenemos el slug del servicio desde la URL

  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si el slug no está disponible todavía, no hacemos nada.
    if (!slug) {
      return;
    }

    const fetchService = async () => {
      setIsLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // Usamos el slug para pedir los datos del servicio específico
        const res = await fetch(`${apiUrl}/services/${slug}/`);
        if (!res.ok) {
          throw new Error('No se pudo encontrar el servicio.');
        }
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [slug]); // El efecto se ejecuta cada vez que el slug cambia

  if (isLoading) {
    return <div className="text-center py-20">Cargando servicio...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }
  
  
  if (!service) {
    return <div className="text-center py-20">Servicio no encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{service.title}</title>
        <meta name="description" content={service.description.substring(0, 160)} />
      </Head>

      {service.image_url && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={service.image_url}
            alt={`Imagen de ${service.title}`}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      <h1 className="text-4xl font-bold mb-4 font-serif text-brand-secondary">{service.title}</h1>
      
      <div className="prose lg:prose-xl max-w-none">
         {service.description.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}