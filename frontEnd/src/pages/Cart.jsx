import { useCart } from "../context/CartContext";
import { BsTrash, BsDash, BsPlus, BsCreditCard } from "react-icons/bs";
import api from "../services/api";

function Cart() {
    const { cartItems = [], removeFromCart, decrementItem, incrementItem, toggleSelect, clearCart } = useCart();
    
    if (cartItems.length === 0) {
        return (
            <p className="text-center mt-20 text-xl"> Votre panier est vide ! </p>
        )
    }

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );

    const handleCheckout = async () => {
        try {
            const res = await api.post("/payments/create-session", {
                selectedOnly: true,
            })
            
            window.location.href = res.data.url;
        } catch (err) {
            console.log("Erreur du paiement", err);
            alert("Erreur lors du paiement !", err)
        }
    }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Panier</h1>

        {cartItems.map((item) => (
            <div 
                className="flex items-center justify-between border-b py-4"
                key={item._id}    
            >   
                <div>
                    <h2 className="font-semibold">
                        {item.product.name}
                    </h2>
                    <p className="text-gray-600">
                        {item.product.price} € x {item.quantity}
                    </p>
                </div>

                <input 
                    type="checkbox"
                    checked={item.selected} 
                    onChange={() => toggleSelect(item.product._id)}
                />

                <div className="flex gap-2">
                    <button 
                        onClick={() => decrementItem(item.product._id)}
                        className="p-2 border rounded hover:bg-gray-500"
                    >
                        <BsDash />
                    </button>

                    <button 
                        onClick={() => incrementItem(item.product._id)}
                        className="p-2 border rounded hover:bg-gray-500"
                    >
                        <BsPlus />
                    </button>

                    <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="p-2 border rounded text-red-600 hover:bg-gray-200"
                    >
                        <BsTrash/>
                    </button>
                </div>
            </div>
        ))}

        <p className="text-xl font-bold mt-6">
            Total : {total.toFixed(2)} €
        </p>

        <div className="text-xl font-bold mt-6">
            <button
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                onClick={handleCheckout}
            >
                <BsCreditCard /> Payer la sélection
            </button>
            
            <button 
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                onClick={clearCart}
            >
                Vider le panier
            </button>
        </div>

    </div>
  );
}

export default Cart;