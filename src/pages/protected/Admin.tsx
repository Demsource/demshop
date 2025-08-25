import React, { useState } from "react";
import ManageProducts from "../../components/ManageProducts";
import ManageCategories from "../../components/ManageCategories";

const Admin: React.FC = () => {
  const [manageEntries, setManageEntries] = useState("products");

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="flex justify-center">
        <div className="space-x-4">
          <button
            onClick={() => setManageEntries("products")}
            className={`bg-[#087E8B] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer ${
              manageEntries === "products" ? "!bg-[#0B3954]" : ""
            } `}
          >
            Manage Products
          </button>
          <button
            onClick={() => setManageEntries("categories")}
            className={`bg-[#087E8B] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer ${
              manageEntries === "categories" ? "!bg-[#0B3954]" : ""
            }`}
          >
            Manage Categories
          </button>
        </div>
      </div>

      {manageEntries === "products" && <ManageProducts />}
      {manageEntries === "categories" && <ManageCategories />}
    </div>
  );
};

export default Admin;
