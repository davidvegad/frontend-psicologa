// pages/contact.js
import { useState } from 'react';
import Head from 'next/head';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
      } else {
        throw new Error('La respuesta del servidor no fue OK');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Head><title>Contacto</title></Head>
      <h1 className="text-4xl font-bold text-center mb-8">Ponte en Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensaje</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" disabled={status === 'loading'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
            {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </div>
      </form>
      {status === 'success' && <p className="text-green-500 text-center mt-4">¡Mensaje enviado con éxito! Te contactaremos pronto.</p>}
      {status === 'error' && <p className="text-red-500 text-center mt-4">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>}
    </div>
  );
}

