import api from "../services/api";
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// Pagination produits
const ITEMS_PER_PAGE = 5;

function AdminDashboard() {
  /* ======================
      STATES
  ====================== */

  // Produits
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Recherche + pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Edition produit
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Ajout produit
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    image: "",
  });

  // Données admin
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  /* ======================
      FETCH PRODUITS
  ====================== */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur chargement produits");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
      FETCH ADMIN STATS + USERS
  ====================== */
  const fetchAdmin = async () => {
    try {
      const statsRes = await api.get("/admin/stats");
      const usersRes = await api.get("/admin/users");

      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Erreur chargement admin :", err);
    }
  };

  /* ======================
      FETCH ORDERS
  ====================== */
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Erreur chargement commandes :", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchAdmin();
    fetchOrders();
  }, []);

  /* ======================
      ADD PRODUCT
  ====================== */
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price),
      });

      setForm({
        name: "",
        brand: "",
        price: "",
        image: "",
      });

      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'ajout du produit");
    }
  };

  /* ======================
      EDIT PRODUCT
  ====================== */
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    try {
      await api.put(`/products/${editingId}`, {
        ...editForm,
        price: Number(editForm.price),
      });

      cancelEdit();
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la modification");
    }
  };

  /* ======================
      DELETE PRODUCT
  ====================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer ce produit ?")) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  /* ======================
      EXPORT CSV
  ====================== */
  const handleExportCSV = async () => {
    try {
      const res = await api.get("/admin/export-products", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Erreur export CSV :", err);
      alert("Impossible d’exporter les produits");
    }
  };

  /* ======================
      SEARCH + PAGINATION
  ====================== */
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* ======================
      CHART DATA
  ====================== */
  const chartData = stats
    ? [
        { name: "Commandes", value: stats.totalOrders || 0 },
        { name: "Payées", value: stats.paidOrders || 0 },
        { name: "Revenue", value: stats.revenue || 0 },
      ]
    : [];

  /* ======================
      RENDER STATES
  ====================== */
  if (loading) {
    return <p className="text-center mt-20">Chargement des produits...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-700">{error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* ======================
          STATS CARDS
      ====================== */}
      {stats && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Vue globale</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total commandes</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>

            <div className="border rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">Commandes payées</p>
              <p className="text-2xl font-bold">{stats.paidOrders}</p>
            </div>

            <div className="border rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">Chiffre d'affaires</p>
              <p className="text-2xl font-bold">{stats.revenue} €</p>
            </div>
          </div>

          {/* ======================
              CHART
          ====================== */}
          <div className="border rounded-xl p-4 shadow-sm bg-white dark:bg-slate-900">
            <h3 className="font-semibold mb-4">Visualisation des statistiques</h3>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      {/* ======================
          USERS
      ====================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>

        {users.length === 0 ? (
          <p className="text-gray-500">Aucun utilisateur trouvé.</p>
        ) : (
          <div className="space-y-2">
            {users.map((u) => (
              <div
                key={u._id}
                className="border p-3 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <span className="font-medium">{u.email}</span>
                <span className="text-sm text-gray-500">{u.role}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ======================
          EXPORT
      ====================== */}
      <section>
        <button
          onClick={handleExportCSV}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Exporter les produits en CSV
        </button>
      </section>

      {/* ======================
          ADD PRODUCT
      ====================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Ajouter un produit</h2>

        <form
          onSubmit={handleAddProduct}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 dark:text-black"
        >
          <input
            placeholder="Nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            placeholder="Marque"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Prix"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            placeholder="Image (ex: sony.jpg)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border p-2 rounded"
          />

          <button className="bg-blue-600 text-white rounded md:col-span-4 p-2 hover:bg-blue-700 transition">
            Ajouter le produit
          </button>
        </form>
      </section>

      {/* ======================
          SEARCH
      ====================== */}
      <section>
        <input
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full dark:text-black"
        />
      </section>

      {/* ======================
          PRODUCTS LIST
      ====================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Gestion des produits</h2>

        {paginatedProducts.map((p) => (
          <div
            key={p._id}
            className="border p-3 rounded mb-2 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
          >
            {editingId === p._id ? (
              <div className="flex flex-col md:flex-row gap-2 w-full dark:text-black">
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="border p-1 rounded flex-1"
                />

                <input
                  value={editForm.brand}
                  onChange={(e) =>
                    setEditForm({ ...editForm, brand: e.target.value })
                  }
                  className="border p-1 rounded flex-1"
                />

                <input
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="border p-1 rounded w-24"
                />

                <button onClick={saveEdit} className="text-green-600">
                  Sauver
                </button>

                <button onClick={cancelEdit} className="text-gray-500">
                  Annuler
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    {p.brand} • {p.price} €
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-blue-600"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {/* ======================
            PAGINATION
        ====================== */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="disabled:opacity-50"
          >
            ← Précédent
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="disabled:opacity-50"
          >
            Suivant →
          </button>
        </div>
      </section>

      {/* ======================
          ORDERS HISTORY
      ====================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Historique des commandes</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">Aucune commande trouvée.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded-xl shadow-sm bg-white dark:bg-slate-900"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-2">
                  <div>
                    <p className="font-semibold">
                      {order.user?.email || "Utilisateur inconnu"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Statut :</span>{" "}
                    <span className="text-green-600">{order.status}</span>
                  </div>
                </div>

                <p className="font-bold mb-3">Total : {order.totalPrice} €</p>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b pb-2 text-sm"
                    >
                      <span>
                        {item.product?.name || "Produit supprimé"}
                      </span>
                      <span>
                        x{item.quantity} • {item.price} €
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;