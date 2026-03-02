/*
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

function Success() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart])

    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-10 border rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Votre paiement a été validé avec succès !
                </h1>

                <p className="text-gray-600 mb-6">
                    Merci pour votre commande. Elle a bien été enregistrée !
                </p>

                <Link 
                    to="/"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Retour à l'accueil !
                </Link>
            </div>
        </div>
    )
}

export default Success;
*/

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";

function Success() {
  const { setCart } = useCart();

  useEffect(() => {
    const refreshCart = async () => {
      try {
        const res = await api.get("//cart");
        setCart(res.data);
      } catch (error) {
        console.error("Erreur refresh panier", error);
      }
    };

    refreshCart();

    // rediction automatique
    const timer = setTimeout(() => {
        navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [setCart, navigate]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Paiement réussi avec succès !
      </h1>
      <p className="mt-4">Merci pour votre commande ! Redirection...</p>
      <Link 
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
          Retour à l'accueil !
      </Link>
    </div>
  );
}

export default Success;