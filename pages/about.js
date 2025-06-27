// pages/about.js (Ejemplo)
import Head from 'next/head';
import Image from 'next/image';

function AboutPage({ profile }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Head><title>Sobre Mí</title></Head>
            <h1 className="text-4xl font-bold mb-8 text-center">Conóceme</h1>
            {profile.photo_url && (
                // Código NUEVO y corregido
				<div className="mx-auto w-48 h-48 relative mb-6">
					<Image
					src={profile.photo_url}
					alt="Foto de perfil"
					fill // La nueva propiedad 'fill' reemplaza a layout="fill"
					style={{ objectFit: 'cover' }} // 'object-cover' se maneja mejor con style cuando se usa 'fill'
					className="rounded-full" // Las otras clases como rounded-full se mantienen
					/>
				</div>
            )}
            <div className="max-w-3xl mx-auto text-lg">
                <h2 className="text-2xl font-semibold mb-2">Mi Biografía</h2>
                <p className="mb-6">{profile.bio}</p>
                <h2 className="text-2xl font-semibold mb-2">Mi Filosofía de Trabajo</h2>
                <p>{profile.philosophy}</p>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Asumimos que el perfil de la psicóloga siempre tendrá ID=1
    const res = await fetch(`${apiUrl}/profile/1/`);
    const profile = await res.json();

    return { props: { profile } };
}

export default AboutPage;