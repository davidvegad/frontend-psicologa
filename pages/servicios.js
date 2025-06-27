// pages/servicios.js

import Head from 'next/head';
import Link from 'next/link';

// Esta es la función principal de tu componente de React
function ServiciosPage({ services }) {
  // 'services' es el prop que recibimos de getStaticProps
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Nuestros Servicios - Psicología</title>
        <meta name="description" content="Descubre los servicios y terapias que ofrecemos." />
      </Head>

      <h1 className="text-4xl font-bold text-center mb-8">Nuestros Servicios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Hacemos un loop sobre el array de servicios */}
        {services.map((service) => (
			<Link 
				href={`/servicios/${service.slug}`} 
				key={service.id}
				className="block border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
			>
				{/* El contenido va directamente dentro del Link */}
				<h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
				<p className="text-gray-700">{service.description.substring(0, 100)}...</p>
			</Link>
		))}
      </div>
    </div>
  );
}

// ESTA ES LA MAGIA DE NEXT.JS
// Esta función se ejecuta en el servidor EN EL MOMENTO DE LA CONSTRUCCIÓN (build)
// Ejemplo en una página cualquiera
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Hacemos fetch a los datos de la página Y al perfil
  const [pageDataRes, profileRes,settingsRes] = await Promise.all([
    fetch(`${apiUrl}/services/`), // o /posts/, etc.
    fetch(`${apiUrl}/profile/1/`),
	fetch(`${apiUrl}/settings/`)
  ]);

  const pageData = await pageDataRes.json();
  const profile = await profileRes.json();
  const siteSettings = await settingsRes.json();

  
  return {
    props: {
      // Devolvemos los datos de la página Y el perfil
      services: pageData.results || pageData,
      profile, siteSettings,
    },
  };
}

export default ServiciosPage;