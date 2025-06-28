// components/HomePageSkeleton.js

const SkeletonCard = () => (
  <div className="border bg-white p-6 rounded-2xl shadow-sm animate-pulse">
    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
  </div>
);

const SkeletonTestimonial = () => (
  <div className="p-8 bg-white rounded-xl shadow-lg animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4 ml-auto"></div>
  </div>
);

const SkeletonBlogPost = () => (
  <div className="border rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

const HomePageSkeleton = () => {
  return (
    <>
      {/* Skeleton para "Sobre Mí" */}
      <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-80 h-80 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </section>

      {/* Skeleton para Servicios */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-12 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>

      {/* Skeleton para Testimonios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-12 animate-pulse"></div>
          <div className="max-w-3xl mx-auto space-y-8">
            <SkeletonTestimonial />
            <SkeletonTestimonial />
          </div>
        </div>
      </section>

      {/* Skeleton para Blog */}
      <section className="bg-white py-20">
         <div className="container mx-auto px-4">
          <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-12 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonBlogPost />
            <SkeletonBlogPost />
            <SkeletonBlogPost />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageSkeleton;