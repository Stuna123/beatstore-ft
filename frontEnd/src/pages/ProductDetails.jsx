import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data); // 🔥 IMPORTANT
      } catch (err) {
        console.error(err);
        setError("Produit introuvable");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <p className="mt-20 text-center text-red-600 text-xl">
        {error}
      </p>
    );
  }

  if (!product) {
    return (
      <p className="mt-20 text-center text-gray-500">
        Chargement du produit...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <img
        src={`http://localhost:5000/images/${product.image}`}
        alt={product.name}
        className="h-64 mx-auto object-contain mb-6"
      />

      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-500 mt-2">{product.brand}</p>
      <p className="text-xl font-semibold mt-4">{product.price} €</p>

      <button
        onClick={() => addToCart(product._id, 1)}
        className="mt-6 bg-red-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductDetails;
