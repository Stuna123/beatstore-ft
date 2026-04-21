import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCard from "../products/ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/products");
        setProducts((res.data.data || []).slice(0, 3));
      } catch (error) {
        console.error("Erreur chargement produits mis en avant", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        Produits mis en avant
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Chargement des produits...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit disponible.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;