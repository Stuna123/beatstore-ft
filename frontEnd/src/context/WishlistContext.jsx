/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  /* ======================
     FETCH UNE SEULE FOIS
  ====================== */
  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlist([]);
      setLoaded(true);
      return;
    }

    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.products || []);
    } catch (error) {
      console.log(error);
      setWishlist([]);
    } finally {
      setLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  /* ======================
     TOGGLE
  ====================== */
  const toggleWishlist = async (productId) => {
    try {
      const res = await api.post(`/wishlist/${productId}`);
      setWishlist(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    toggleWishlist,
    loaded
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
