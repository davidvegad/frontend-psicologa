// pages/servicios.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// El componente ya no recibe los servicios como props
export default function ServiciosPage() {
  // Creamos estados para guardar los servicios, y para saber si está cargando o hubo un error
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta una vez que el componente se carga en el navegador del cliente
  useEffect(() => {
    // Definimos la función para obtener los datos
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/services/`);
        if (!res.ok) {
          throw new Error('No se pudieron obtener los datos de los servicios');
        }
        const data = await res.json();
        setServices(data.results || data); // Guardamos los servicios en el estado
      } catch (err) {
        setError(err.message); // Guardamos el error
      } finally {
        setIsLoading(false); // Dejamos de cargar, ya sea con éxito o con error
      }
    };

    fetchServices(); // Ejecutamos la función
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  // Mostramos un mensaje de "Cargando..." mientras se obtienen los datos
  if (isLoading) {
    return <div className="text-center py-20">Cargando servicios...</div>;
  }

  // Mostramos un mensaje de error si la API falló
  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white py-20">
      <Head>
        <title>Servicios - Psicóloga Maya Muñoz</title>
      </Head>
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl font-bold text-brand-secondary mb-12">¿Cómo Puedo Ayudarte?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link href={`/servicios/${service.slug}`} key={service.id} className="bg-brand-light p-8 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <CheckCircleIcon className="w-12 h-12 text-brand-primary mb-4" />
              <h3 className="text-2xl font-bold font-serif text-brand-secondary mb-2">{service.title}</h3>
              <p className="text-brand-text">{service.description.substring(0, 100)}...</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}