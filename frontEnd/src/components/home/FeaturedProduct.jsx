import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCard from "../products/ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/products?limit=3");
        setProducts(res.data.data || []);
      } catch (e) {
        console.error(e);
      }
    };

    fetch();
  }, []);

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Produits populaires !
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
