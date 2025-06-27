// pages/blog/[slug].js
import Head from 'next/head';
import Image from 'next/image';

function PostDetailPage({ post }) {
  if (!post) return <p>Artículo no encontrado.</p>;

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
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-8">
          <span>Por {post.author.first_name} {post.author.last_name}</span>
          <span className="mx-2">&bull;</span>
          <span>{postDate}</span>
        </div>

        {post.featured_image_url && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
             <Image src={post.featured_image_url} alt={post.title} width={1200} height={600} className="w-full h-auto object-cover"/>
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

export async function getStaticPaths() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/posts/?status=published`);
  const postsData = await res.json();
  const posts = postsData.results || postsData;

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/posts/${params.slug}/`);
  const profileRes = await fetch(`${apiUrl}/profile/1/`);
  const settingsRes = await fetch(`${apiUrl}/settings/`);
  
  const post = await res.json();
  const profile = await profileRes.json();
  const siteSettings = await settingsRes.json();


  return {
    props: {
      post,profile,siteSettings,
    },
  };
}

export default PostDetailPage;