import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react'; // <-- Importar hooks
import Image from 'next/image';
import { WhatsAppContext } from '../../context/WhatsAppContext'; // <-- Importar contexto


// Este es el componente que renderiza tu página
function ServiceDetailPage({ service }) {
  const router = useRouter();
  // Obtenemos la función para actualizar el contexto
  const { setWhatsAppConfig } = useContext(WhatsAppContext);
  
  useEffect(() => {
    // Si el servicio tiene un número o mensaje específico, lo establecemos
    if (service.whatsapp_number || service.whatsapp_message) {
      setWhatsAppConfig({
        number: service.whatsapp_number,
        message: service.whatsapp_message,
      });
    }

    // ¡MUY IMPORTANTE! Esta es la función de limpieza.
    // Se ejecuta cuando el usuario navega FUERA de esta página.
    return () => {
      // Reseteamos la configuración a null para que otras páginas usen el valor por defecto.
      setWhatsAppConfig(null);
    };
  }, [service, setWhatsAppConfig]); // Dependencias del efecto


  // Si la página aún no se ha generado estáticamente, puedes mostrar un 'fallback'
  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  // Si por alguna razón el servicio no se encuentra, muestra un mensaje amigable
  if (!service) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl">Servicio no encontrado</h1>
        <p>No pudimos encontrar el servicio que buscas.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{service.title}</title>
        <meta name="description" content={service.description.substring(0, 160)} />
      </Head>

      {service.image_url && (
        <Image
          src={service.image_url}
          alt={`Imagen de ${service.title}`}
		  width={1200} 
		  height={600}
          className="w-full max-h-96 object-cover rounded-lg mb-8 shadow-lg"
        />
      )}
      
      <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
      
      {/* Usamos 'prose' de Tailwind para estilizar fácilmente el texto */}
      <div className="prose lg:prose-xl max-w-none">
         {/* La descripción se renderizará como HTML si contiene saltos de línea */}
         {service.description.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

// === ¡AQUÍ ESTÁ LA PARTE IMPORTANTE! ===

// 1. getStaticPaths: Le dice a Next.js qué páginas debe pre-construir
export async function getStaticPaths() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Hacemos un fetch a la lista de servicios para obtener todos los 'slugs'
  const res = await fetch(`${apiUrl}/services/`);
  const services = await res.json();

  // Creamos un array de rutas que Next.js usará
  const paths = services.map((service) => ({
    params: { slug: service.slug },
  }));

  // fallback: false significa que si se intenta acceder a un slug
  // que no está en esta lista, se mostrará una página 404.
  return { paths, fallback: false };
}

// 2. getStaticProps: Para cada una de esas páginas, obtiene sus datos específicos
export async function getStaticProps({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Usamos el 'slug' que viene en los params para hacer el fetch al servicio individual
  const res = await fetch(`${apiUrl}/services/${params.slug}/`);
  const prof = await fetch(`${apiUrl}/profile/1/`);
  const settingsRes = await fetch(`${apiUrl}/settings/`);
  const service = await res.json();
  const profile  = await prof.json();
  const siteSettings = await settingsRes.json();

  // Pasamos los datos del servicio como 'props' a nuestro componente ServiceDetailPage
  return {
    props: {
      service,profile,siteSettings,
    },
  };
}

export default ServiceDetailPage;