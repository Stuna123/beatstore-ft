import api from "../services/api";
// import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Pagination
const ITEMS_PER_PAGE = 5;

function AdminDashboard() {

  /* ======================
      STATES
  ====================== */

  // Produits
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  // Recherche + pagination
  const [search,setSearch]=useState("");
  const [page,setPage]=useState(1);

  // Edition produit
  const [editingId,setEditingId]=useState(null);
  const [editForm,setEditForm]=useState({});

  // Ajout produit
  const [form,setForm]=useState({
    name:"",
    brand:"",
    price:"",
    image:""
  });

  // ADMIN DATA
  const [stats,setStats]=useState(null);
  const [users,setUsers]=useState([]);

  // const navigate = useNavigate();


  /* ======================
      FETCH PRODUITS
  ====================== */
  const fetchProducts = async ()=>{
    try{
      const res = await api.get("/products");
      setProducts(res.data.data || []);
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  };

  /* ======================
      FETCH ADMIN DATA
  ====================== */
  const fetchAdmin = async ()=>{
    try{
      const s = await api.get("/admin/stats");
      const u = await api.get("/admin/users");

      setStats(s.data);
      setUsers(u.data);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchProducts();
    fetchAdmin();
  }, []);

/*
  useEffect(() => {
    const role = localStorage.getItem("role");
    if(role !== "admin") {
      navigate("/")
    }
  }, [navigate]);
*/

  /* ======================
      ADD PRODUCT
  ====================== */
  const handleAddProduct = async(e)=>{
    e.preventDefault();

    await api.post("/products",{
      ...form,
      price:Number(form.price)
    });

    setForm({name:"",brand:"",price:"",image:""});
    fetchProducts();
  };


  /* ======================
      EDIT PRODUCT
  ====================== */
  const startEdit = (product)=>{
    setEditingId(product._id);
    setEditForm(product);
  };

  const cancelEdit = ()=>{
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async()=>{
    await api.put(`/products/${editingId}`,{
      ...editForm,
      price:Number(editForm.price)
    });

    cancelEdit();
    fetchProducts();
  };


  /* ======================
      DELETE PRODUCT
  ====================== */
  const handleDelete = async(id)=>{
    if(!confirm("Supprimer ?")) return;

    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  /* ======================
      SEARCH + PAGINATION
  ====================== */
  const handleExportCSV = async () => {
    try {
      const res = await api.get('/admin/export-products', {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","product.csv")
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.error(error)
    }
  }

  /* ======================
      SEARCH + PAGINATION
  ====================== */
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length/ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page-1)*ITEMS_PER_PAGE,
    page*ITEMS_PER_PAGE
  );


  if(loading) return <p className="text-center mt-20">Chargement…</p>;
  if(error) return <p className="text-center text-red-600">{error}</p>;


  return(
  <div className="p-6 max-w-6xl mx-auto">

    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

    {/* ======================
        STATS
    ====================== */}
    {stats && (
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="border p-3 rounded">Commandes : {stats.totalOrders}</div>
        <div className="border p-3 rounded">Payées : {stats.paidOrders}</div>
        <div className="border p-3 rounded">Revenue : {stats.revenue}€</div>
      </div>
    )}

    {/* ======================
        USERS
    ====================== */}
    <div className="mb-10">
      <h2 className="font-semibold mb-2">Utilisateurs</h2>

      {users.map(u=>(
        <div key={u._id} className="border p-2 rounded mb-2">
          {u.email} — {u.role}
        </div>
      ))}
    </div>

    {/* EXPORT */}
    <button
      onClick={handleExportCSV}
      className="bg-black text-white px-4 py-2 rounded inline-block mb-10"
    >
      Export CSV produits
    </button>


    {/* ======================
        ADD PRODUCT
    ====================== */}
    <form onSubmit={handleAddProduct} className="grid grid-cols-4 gap-2 mb-8">
      <input placeholder="Nom" value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})}
        className="border p-2 dark:text-black"/>

      <input placeholder="Marque" value={form.brand}
        onChange={(e)=>setForm({...form,brand:e.target.value})}
        className="border p-2 dark:text-black"/>

      <input placeholder="Prix" value={form.price}
        onChange={(e)=>setForm({...form,price:e.target.value})}
        className="border p-2 dark:text-black"/>

      <input placeholder="Image" value={form.image}
        onChange={(e)=>setForm({...form,image:e.target.value})}
        className="border p-2 dark:text-black"/>

      <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 col-span-4 transition">
        Ajouter produit
      </button>
    </form>


    {/* SEARCH */}
    <input
      placeholder="Recherche"
      value={search}
      onChange={(e)=>{setSearch(e.target.value);setPage(1)}}
      className="border p-2 w-full mb-6 dark:text-black"
    />


    {/* LIST PRODUITS */}
    {paginatedProducts.map(p=>(
      <div key={p._id} className="border p-3 mb-2 flex justify-between">

        {editingId===p._id ? (
          <>
            <input 
              value={editForm.name}
              onChange={(e)=>setEditForm({...editForm,name:e.target.value})}
              className="dark:text-black"
              />
            <input 
              value={editForm.price}
              onChange={(e)=>setEditForm({...editForm,price:e.target.value})}
              className="dark:text-black"
              />

            <button onClick={saveEdit}>Sauver</button>
            <button onClick={cancelEdit}>Annuler</button>
          </>
        ) : (
          <>
            <div>
              {p.name} — {p.brand} — {p.price}€
            </div>

            <div className="flex gap-3">
              <button onClick={()=>startEdit(p)}>Modifier</button>
              <button onClick={()=>handleDelete(p._id)}>Supprimer</button>
            </div>
          </>
        )}

      </div>
    ))}

    {/* PAGINATION */}
    <div className="flex gap-4 justify-center mt-6">
      <button disabled={page===1} onClick={()=>setPage(page-1)}>←</button>
      <span>{page}/{totalPages}</span>
      <button disabled={page===totalPages} onClick={()=>setPage(page+1)}>→</button>
    </div>

  </div>
  );
}

export default AdminDashboard;
