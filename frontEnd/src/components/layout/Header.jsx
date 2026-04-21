import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";

const Header = () => {
  const { user, logout, isAuthentificated, isAdmin } = useAuth();
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const { wishlistCount } = useWishlist();
  
  const totalItems = (cartItems || []).reduce( 
    (sum, item) => sum + item.quantity, 
    0 
  )

  const navLinkClass = (path) =>
    `block px-4 py-3 rounded-md transition-colors
     ${location.pathname === path
        ? "bg-slate-800 text-blue-400"
        : "hover:bg-slate-800"}`;

  return (
    <header className="bg-slate-950 text-slate-100 border-b border-slate-800 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          BeatStore
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden sm:flex items-center space-x-2">
          <Link to="/" className={navLinkClass("/")}> Accueil </Link>
          <Link to="/products" className={navLinkClass("/products")}> Produits </Link>

          <Link to="/cart" className={`relative ${navLinkClass("/cart")}`}>
            Panier 🛒
            {totalItems > 0 && (
              <span className="absolute top-1 right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthentificated && (
            <Link to="/dashboard" className={navLinkClass("/dashboard")}>
              Tableau de bord
            </Link>
          )}

          {isAdmin && (
            <Link  to="/admin" className={navLinkClass("/admin")}>
              Admin
            </Link>
          )}

          <span> ❤ {wishlistCount} </span>

          {!isAuthentificated ? (
            <>
              <Link to="/login" className={navLinkClass("/login")}>Connexion</Link>
              <Link to="/register" className={navLinkClass("/register")}>Inscription</Link>
            </>
          ) : (
            <>
              <span className="px-4 text-sm text-slate-400">{user.email}</span>
              <button onClick={logout} className="px-4 text-red-500">
                Déconnexion
              </button>
            </>
          )}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="border border-slate-700 px-3 py-1 rounded-md"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="sm:hidden bg-slate-950 border-t border-slate-800">
          <Link onClick={() => setOpen(false)} to="/" className={navLinkClass("/")}> Accueil </Link>
          <Link onClick={() => setOpen(false)} to="/products" className={navLinkClass("/products")}> Produits </Link>
          <Link onClick={() => setOpen(false)} to="/cart" className={navLinkClass("/cart")}> Panier 🛒 </Link>

          {isAuthentificated && (
            <Link onClick={() => setOpen(false)} to="/dashboard" className={navLinkClass("/dashboard")}>
              Tableau de bord
            </Link>
          )}

          {isAdmin && (
            <Link onClick={() => setOpen(false)} to="/admin" className={navLinkClass("/admin")}>
              Admin
            </Link>
          )}

          {!isAuthentificated ? (
            <>
              <Link onClick={() => setOpen(false)} to="/login" className={navLinkClass("/login")}>
                Connexion
              </Link>
              <Link onClick={() => setOpen(false)} to="/register" className={navLinkClass("/register")}>
                Inscription
              </Link>
            </>
          ) : (
            <>
              <span className="block px-4 py-3 text-slate-400">{user.email}</span>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-slate-800"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
