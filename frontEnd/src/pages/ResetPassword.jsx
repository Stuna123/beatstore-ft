import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/auth/reset-password/${token}`, { password });
            setMessage("Le mot de passe a été mise à jour")
        } catch(err) {
            setError(err.response?.data?.message || "Erreur serveur")
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 border-solid border-2 border-sky-500 rounded">
                <h2 className="text-2xl font-bold mb-4 text-center"> Nouveau mot de passe </h2>
                {error && <p className="text-red-600 mb-4"> {error} </p>}
                {message && <p className="text-green-600 text-center mb-3"> {message} </p>}
                
                <form onSubmit={handleSubmit}>
                    <input 
                        className="border p-2 w-full mb-4 dark:text-black"
                        type="password" 
                        placeholder="Nouveau mot de passe" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}    
                    />
                    <button className="bg-blue-600 hover:bg-blue-800 w-full py-2 rounded">
                        Valider
                    </button>
                </form>

                <p className="text-center mt-4 text-sm">
                <Link to="/login" className="text-blue-600">
                    Retour à la connexion
                </Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPassword;
/*
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">
        {error && <p className="text-red-600 mb-4"> {error} </p>}
        {message && (
          <p className="text-green-600 text-center mb-3">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Votre email"
            className="border p-2 w-full mb-4 dark:text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
            Envoyer !
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          <Link to="/login" className="text-blue-600">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
*/