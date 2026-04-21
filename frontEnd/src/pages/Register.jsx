import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email invalide. Veuillez écrire correctement le mail.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne sont pas identiques.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Compte créé avec succès ! Redirection...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-sky-500 rounded dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>

      {error && <p className="text-red-600 mb-5">{error}</p>}
      {message && <p className="text-green-600 mb-5">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded dark:bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 border rounded dark:bg-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            Le mot de passe doit contenir au moins 6 caractères.
          </p>
        </div>

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="w-full p-2 border rounded dark:bg-gray-800"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Création..." : "S'inscrire"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        <Link to="/login" className="text-blue-600">
          Déjà un compte ? Se connecter
        </Link>
      </p>
    </div>
  );
}

export default Register;