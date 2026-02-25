import { useEffect, useState } from "react";
import api from "../services/api";
import ProductList from "../components/products/ProductList";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products");
      setProducts(res.data.data ?? res.data)
    }
    fetchProducts()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
            Nos produits
        </h1>
        <ProductList products={products} />
    </div>
  );
}

export default Products;