import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!isValidEmail(email)) {
      setError("L'email est invalide. Veuillez le saisir correctement.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });
      setMessage("L'email de réinitialisation a été envoyé.");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border-solid border-2 border-sky-500 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Mot de passe oublié
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Votre email"
            className="border p-2 w-full mb-4 dark:text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          <Link to="/login" className="text-blue-600">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;