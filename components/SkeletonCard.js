// components/SkeletonCard.js

const SkeletonCard = () => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden animate-pulse">
      {/* Placeholder para la imagen */}
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6">
        {/* Placeholder para el título */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        {/* Placeholder para el texto */}
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;