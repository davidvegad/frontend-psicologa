// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Necesitarás instalar @heroicons/react

function HomePage({ posts, testimonials, services, profile }) {
  return (
    <div className="bg-brand-light">
      <Head>
  <title>{`Psicóloga ${profile ? `${profile.user.first_name} ${profile.user.last_name}` : '[Nombre]'}`}</title>
  {/* ... */}
</Head>

      {/* Sección Hero */}
      <section className="text-center py-24 px-4">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-secondary">
          Un Espacio Seguro Para Crecer
        </h1>
        <p className="text-xl text-brand-text mt-6 max-w-2xl mx-auto">
          Te acompaño en tu proceso de autoconocimiento y bienestar emocional a través de una terapia cercana y profesional.
        </p>
        <Link href="/contact" className="mt-10 inline-block bg-brand-primary text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-brand-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl">
          Agendar una Cita
        </Link>
      </section>

      {/* Sección "Sobre Mí" (Teaser) */}
      {profile && (
        <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-4xl font-bold text-brand-secondary mb-4">Hola, soy {profile.user.first_name}</h2>
            <p className="text-brand-text text-lg mb-6">{profile.bio.substring(0, 250)}...</p>
            <Link href="/about" className="font-bold text-brand-primary hover:text-brand-primary-dark transition-colors">
              Conoce más sobre mí &rarr;
            </Link>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <Image src={profile.photo_url} alt={`Foto de ${profile.user.first_name}`} width={1200} height={600} className="w-80 h-80 rounded-full object-cover shadow-2xl" />
          </div>
        </section>
      )}

      {/* Sección Servicios */}
      <section className="bg-white py-20">
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
      </section>

      {/* Sección de Testimonios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-brand-secondary text-center mb-12 font-serif">Lo que dicen mis pacientes</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="p-8 bg-white rounded-xl shadow-lg relative">
                <p className="text-xl text-brand-text italic relative z-10">“{testimonial.quote}”</p>
                <cite className="block text-right mt-4 font-semibold text-brand-secondary not-italic">- {testimonial.author}</cite>
                <div className="absolute top-2 left-4 text-8xl text-brand-primary opacity-10 font-serif">“</div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Últimos Artículos del Blog */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-secondary text-center mb-12 font-serif">Desde Mi Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="block border rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
                <Image src={post.featured_image_url || 'https://via.placeholder.com/400x250'} alt={post.title} width={1200} height={600} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-brand-secondary mb-2">{post.title}</h3>
                  <p className="text-brand-text mb-4">{post.content.substring(0, 100)}...</p>
                  <span className="font-bold text-brand-primary">Leer más &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// Actualizamos getStaticProps para que obtenga todos los datos necesarios
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [postsRes, testimonialsRes, servicesRes, profileRes, settingsRes] = await Promise.all([
    fetch(`${apiUrl}/posts/?status=published`),
    fetch(`${apiUrl}/testimonials/?is_visible=true`),
    fetch(`${apiUrl}/services/`),
    fetch(`${apiUrl}/profile/1/`),
	fetch(`${apiUrl}/settings/`)
  ]);

  const postsData = await postsRes.json();
  const testimonialsData = await testimonialsRes.json();
  const servicesData = await servicesRes.json();
  const profile = await profileRes.json();
  const siteSettings = await settingsRes.json();
  
  return {
    props: {
      posts: (postsData.results || postsData).slice(0, 3),
      testimonials: (testimonialsData.results || testimonialsData).slice(0, 2),
      services: (servicesData.results || servicesData),
      profile,siteSettings,
    },
  };
}

export default HomePage;