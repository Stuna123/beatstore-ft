import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center mb-16">

      {/* TEXTE */}
      <div className="max-w-7xl p-6 mx-auto px-4 py-10" >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Un son premium. Sans compromis.
        </h1>

        <p className="text-gray-400 mb-6">
          Découvrez nos écouteurs conçus pour une expérience audio immersive.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 hover:text-white px-6 py-3 rounded font-semibold transition"
          >
            Voir les produits
          </Link>

          <Link
            to="/products"
            className="border border-slate-700 px-6 py-3 rounded"
          >
            Acheter maintenant
          </Link>
        </div>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center">
        <img
          src="/assets/images/samsung-galaxy-buds2_.png"
          alt="headphones"
          className="max-h-[400px] object-contain"
        />
      </div>
    </section>
  );
}

export default Hero;

/**

import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center mb-16">

      
      <div className="max-w-7xl p-6 mx-auto px-4 py-10" >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Un son premium. Sans compromis.
        </h1>

        <p className="text-gray-400 mb-6">
          Découvrez nos écouteurs conçus pour une expérience audio immersive.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
          >
            Voir les produits
          </Link>

          <Link
            to="/products"
            className="border border-slate-700 px-6 py-3 rounded"
          >
            Acheter maintenant
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src="/assets/images/samsung-galaxy-buds2_.png"
          alt="headphones"
          className="max-h-[400px] object-contain"
        />
      </div>
    </section>
  );
}

export default Hero;


*/
