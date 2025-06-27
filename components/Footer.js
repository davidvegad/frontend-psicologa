// components/Footer.js

// Ahora el componente recibe 'profile' como un prop
export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();
  
  // Usamos el nombre del perfil si existe, si no, usamos el texto por defecto
  const psychologistName = profile ? `${profile.user.first_name} ${profile.user.last_name}` : '[Nombre]';

  return (
    <footer className="bg-gray-100 text-center py-6 mt-12">
      <p className="text-gray-600">
        &copy; {currentYear} Psicóloga {psychologistName}. Todos los derechos reservados.
      </p>
    </footer>
  );
}