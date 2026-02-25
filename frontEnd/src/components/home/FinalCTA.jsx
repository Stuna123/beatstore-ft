import { Link } from "react-router-dom";

function FinalCTA() {
  return (
    <div>
        <section className="text-center py-8 border-t border-slate-800">
            <h2 className="text-3xl font-bold mb-4"> 
                Prêt à vivre une nouvelle expérience sonore ?
            </h2>

            <p className="text-gray-400 mb-6">
                Découvrez notre collection d'écouteurs premium.
            </p>

            <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 hover:text-white px-6 py-3 rounded-xl font-semibold transition"
            >
                Explorer les produits
            </Link>

        </section>
    </div>
  )
}

export default FinalCTA;