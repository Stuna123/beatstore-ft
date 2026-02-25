import { Link } from "react-router-dom"

function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-10 border rounded-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                Votre paiement a été annulé !
            </h1>

            <p className="mb-6">
                Le paiement a été annulé. Vous pouvez réessayer.
            </p>

            <Link
                to="/cart"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Retour au panier !
            </Link>
        </div>
    </div>
  )
}

export default Cancel