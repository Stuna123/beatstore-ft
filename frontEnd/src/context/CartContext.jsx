/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    let isMounted = true;

    if (!user) {
      if(isMounted) setCart({ items: [] });
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        if(isMounted) {
          setCart(res.data || { items: [] });
        }
      } catch (error) {
        console.error("Erreur chargement panier", error);
        if(isMounted) {
          setCart({ items: [] });
        }
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await api.post("/cart", { productId, quantity });
      setCart(res.data);
    } catch (error) {
      console.error("Erreur ajout panier", error);
      alert("Vous devez être connecté pour ajouter au panier");
    }
  };

  const removeFromCart = async (productId) => {
    if(!confirm("Voulez-vous supprimer ce produit du panier ?")) return;

    const res = await api.delete(`/cart/${productId}`);
    setCart(res.data);
  };

  const decrementItem = async (productId) => {
    const res = await api.patch(`/cart/decrement/${productId}`);
    setCart(res.data);
  };

  const incrementItem = async (productId) => {
    const res = await api.patch(`/cart/increment/${productId}`);
    setCart(res.data);
  };

  const clearCart = async () => {
    if(!confirm("Voulez-vous vider le panier ?")) return;

    await api.delete("/cart/clear");
    setCart({ items: [] });
  };

  const toggleSelect = async (productId) => {
    const res = await api.patch(`/cart/toggle/${productId}`);
    setCart(res.data)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems: cart.items || [],
        setCart,
        addToCart,
        removeFromCart,
        decrementItem,
        incrementItem,
        clearCart,
        toggleSelect
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);