import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("")

  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password) {
        setError("Veuillez entrer l'email et le mot de passe, s'il vous plaît !");
        return;
    }

    try {
        await login(email, password);
        navigate("/");
    } catch (error) {
        setError("Email ou mot de passe incorrect... ", error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6 border-solid border-2 border-sky-500 rounded">
            <h1 className="text-2xl font-bold mb-4 text-center"> Connexion </h1>

            {error && (
                <p className='text-red-600 mb-3 text-center'> {error} </p>
            )}

            <form onSubmit={handleSubmit}> 
                <input 
                    type="email" 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-solid border-2 border-sky-300 p-2 w-full mb-4 dark:text-black'
                />

                <input 
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-solid border-2 border-sky-300 p-2 w-full mb-4 dark:text-black'
                />

                <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md">
                    Se connecter
                </button>
            </form>
            <div className="text-center mt-4 text-sm">
                <Link to="/register" className="text-blue-600">
                    Créer un compte !
                </Link>
                <br />
                <Link to="/forgot-password" className="text-blue-600">
                    Mot de passe oublié ?
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login