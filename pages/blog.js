// pages/blog.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonCard from '../components/SkeletonCard'; // <-- 1. Importar el Skeleton


export default function BlogPage() {
  // 1. Creamos los estados para posts, carga y errores
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Usamos useEffect para llamar a la API cuando la página carga en el navegador
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // Obtenemos solo los posts que estén publicados
        const res = await fetch(`${apiUrl}/posts/?status=published`);
        if (!res.ok) {
          throw new Error('No se pudieron obtener los artículos del blog');
        }
        const data = await res.json();
        setPosts(data.results || data); // Guardamos los posts en el estado
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Terminamos la carga
      }
    };

    fetchPosts();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // 3. Mostramos un estado de carga mientras esperamos la respuesta de la API
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 font-serif text-brand-secondary">Mi Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Creamos un array de 6 elementos para mostrar 6 skeleton cards */}
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // 4. Mostramos un mensaje de error si la API falla
  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Blog - Artículos sobre Psicología y Bienestar</title>
      </Head>

      <h1 className="text-4xl font-bold text-center mb-12 font-serif text-brand-secondary">Mi Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="flex flex-col border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {post.featured_image_url && (
              <div className="w-full h-48 relative">
                <Image
                  src={post.featured_image_url}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-2xl font-semibold mb-2 font-serif text-brand-secondary">{post.title}</h2>
              <p className="text-brand-text flex-grow">{post.content.substring(0, 120)}...</p>
              <span className="text-brand-primary mt-4 font-semibold">Leer artículo completo &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}