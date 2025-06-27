// pages/blog/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // 1. Importamos el hook useRouter
import Head from 'next/head';
import Image from 'next/image';

export default function PostDetailPage() {
  // 2. Usamos useRouter para acceder a la información de la URL
  const router = useRouter();
  const { slug } = router.query; // Obtenemos el slug, ej: "como-mejorar-la-comunicacion"

  // 3. Creamos los estados, igual que en la página de listado
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 4. useEffect se ejecutará cuando el 'slug' esté disponible
  useEffect(() => {
    // Si el slug todavía no está listo, no hacemos nada
    if (!slug) {
      return;
    }

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // Usamos el slug de la URL para pedir los datos del post específico
        const res = await fetch(`${apiUrl}/posts/${slug}/`);
        if (!res.ok) {
          throw new Error('No se pudo encontrar el artículo.');
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]); // Se vuelve a ejecutar si el slug cambia

  // 5. Manejamos los estados de carga y error
  if (isLoading) {
    return <div className="text-center py-20">Cargando artículo...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }
  
  if (!post) {
      return <div className="text-center py-20">Artículo no encontrado.</div>;
  }

  // Formatear la fecha para que sea más legible
  const postDate = new Date(post.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Head>
      
      <article>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-serif text-brand-secondary">{post.title}</h1>
        <div className="text-gray-500 mb-8">
          <span>Por {post.author.first_name} {post.author.last_name}</span>
          <span className="mx-2">&bull;</span>
          <span>{postDate}</span>
        </div>

        {post.featured_image_url && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={post.featured_image_url} 
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose lg:prose-xl max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}