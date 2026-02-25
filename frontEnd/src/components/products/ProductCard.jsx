import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const { toggleWishlist } = useWishlist();

    const handleAdd = async () => {
        await addToCart(product._id, 1)

        setAdded(true);
        setTimeout( () => setAdded(false), 2000)
    }

  return (
    <div className="border rounded-lg p-4 flex flex-col">
        {added && (
            <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow z-50">
                Produit ajouté au panier 
            </div>
        )}
        <div className="w-full h-80 overflow-hidden rounded">
            <img 
                src={`http://localhost:5000/images/${product.image}`} 
                alt={product.name} 
                className="w-full h-full object-cover"
            />            
        </div>

        <h2 className="font-semibold text-lg"> {product.name} </h2>
        <p className="text-gray-500"> {product.brand} </p>
        <p className="font-bold mt-2"> {product.price} €</p>

        <div className="mt-auto flex gap-2">
            <Link 
                to={`/products/${product._id}`}
                className="flex-1 text-center bg-gray-200 hover:bg-gray-400 px-3 py-2 rounded dark:text-black transition"
            >
                Voir plus des détails
            </Link>

            <button 
                onClick={handleAdd}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition"
            >
                Ajouter au panier
            </button>

            <button
                onClick={() => toggleWishlist(product._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition"
            >
                Favoris
            </button>
        </div>

    </div>
  )
}

export default ProductCard
