import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
import api from "../services/api"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const navigate = useNavigate();
  // const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", {
        email,
        password,
      })

      if(!email || !password || !confirmPassword) {
          alert("Veuillez inscrire toutes les informations pour la création du compte,\n s'il vous plaît !");
          return;
      }

      if(!isValidEmail(email)) {
          setError("Email invalide. Veuillez écrire correctement le mail !")
      }

      if (password.length <= 6) {
          alert("Mot de passe trop court (minimum 6 caractères)")
          return navigate("/register")
      }
      
      if(password !== confirmPassword) {
          alert("Les mots de passe ne sont pas identiques !")
          return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify((data.user)));

      // login(email, password);
      navigate("/")

      console.log("Correct");

    } catch (error) {
      setError(error.response?.data?.message || "Erreur serveur")
    }
  }

  return(
    <div className="max-w-md mx-auto mt-20 p-6 border border-sky-500 rounded dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center"> Créer un compte </h1>
        {error && <p className="text-red-600 mb-5"> {error} </p> }

        <form onSubmit={handleSubmit} className="space-y-4">
            <input 
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded dark:bg-gray-800" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type="password"
                placeholder="Mot de passe"
                className="w-full p-2 border rounded dark:bg-gray-800" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input 
                type="password"
                placeholder="Confirmer le mot de passe"
                className="w-full p-2 border rounded dark:bg-gray-800" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="w-full bg-green-600 text-white py-2 rounded">
                S'inscrire
            </button>
        </form>
    </div>
  )
}

export default Register