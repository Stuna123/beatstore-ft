import { useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ products = [] }) {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [search, setSearch] = useState("");

  const brands = ["All", ...new Set(products.map(p => p.brand))];

  const filteredProducts = products.filter((product) => {
    const matchBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  return (
    <div>
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 dark:text-black">
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border p-2 rounded"
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>

      {/* Liste */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500"> Chargement des produits...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
