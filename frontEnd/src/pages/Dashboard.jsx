import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);

    const fetchWishlist = async () => {
        try {
            const res = await api.get("/wishlist");
            setWishlist(res.data.products);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect( () => {
        fetchWishlist();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get("/auth/me");
                setUser(data);

            } catch (error) {
                console.error("Accès refusé", error.message);
            }
        };

        fetchUser()
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders/my");
                setOrders(res.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [])

    if(!user) return <p className="text-center py-4"> Chargement... </p>
    if(loading) return <p className="text-center py-4"> Chargement de vos commandes... </p>
    if (!orders.length) return <p className="text-center py-4">Vous n'avez encore aucune commande</p>;


    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold"> Dashboard Utilisateur </h1>
            <p> {user.email} </p>
            <p> Rôle: {user.role} </p>

            <div className="mt-6">
                {orders.map(order => (
                    <div key={order._id} className="border-2 p-4 border-sky-500 rounded mb-4">
                        <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleString()}
                        </p>

                        <p className="font-bold">Total : {order.totalPrice} €</p>

                        <div className="mt-2">
                        <p className="font-bold py-2"> Vos commandes </p>
                        {order.items.map(item => (
                            <div key={item._id} className="flex justify-between">
                                <span>{item.product.name}</span>
                                <span>x {item.quantity}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold mt-10 mb-4">Mes favoris</h2>
            {!wishlist.length && <p> Aucun favoris</p>}
            {wishlist.map(p => (
                <div 
                    key={p._id}
                    className="border p-3 mb-2 rounded"
                >
                    {p.name} ─ {p.price} €
                </div>
            ))}
        </div>
    )
}

export default Dashboard;
/**
<h2 className="text-xl font-bold mt-10 mb-4">Mes favoris</h2>

{!wishlist.length && <p>Aucun favoris</p>}

{wishlist.map(p=>(
 <div key={p._id} className="border p-3 mb-2 rounded">
   {p.name} — {p.price}€
 </div>
))}
 */