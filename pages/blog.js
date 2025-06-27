// pages/blog.js
import Head from 'next/head';
import Link from 'next/link';

function BlogPage({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Blog - Artículos sobre Psicología y Bienestar</title>
      </Head>

      <h1 className="text-4xl font-bold text-center mb-12">Mi Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="flex flex-col border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {post.featured_image_url && (
              <div className="w-full h-48 relative">
                <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover"/>
              </div>
            )}
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 flex-grow">{post.content.substring(0, 120)}...</p>
              <span className="text-blue-500 mt-4 font-semibold">Leer artículo completo &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  //const res = await fetch(`${apiUrl}/posts/?status=published`);
  const [pageDataRes, profileRes,settingsRes] = await Promise.all([
    fetch(`${apiUrl}/posts/?status=published`), // o /posts/, etc.
    fetch(`${apiUrl}/profile/1/`),
	fetch(`${apiUrl}/settings/`)
  ]);
  const pageData = await pageDataRes.json();
  const profile = await profileRes.json();
  const siteSettings = await settingsRes.json();


  return {
    props: {
      posts: pageData.results || pageData,
      profile, siteSettings,
    },
  };
}



export default BlogPage;