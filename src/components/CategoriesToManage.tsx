import React from "react";
import {
  tryDeleteCategory,
  type CategoryInterface,
} from "../services/api/category";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { toast } from "react-toastify";

interface CategoriesToManageInterface {
  categories: CategoryInterface[];
  updateCategories: (categories: CategoryInterface[]) => void;
}

const CategoriesToManage: React.FC<CategoriesToManageInterface> = ({
  categories,
  updateCategories,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const handleDeleteCategory = async (categoryId: string) => {
    if (token) {
      try {
        const status = await tryDeleteCategory(token, categoryId);

        if (status === 200) {
          const updatedCategories = categories.filter(
            (category) => category.id !== categoryId
          );

          updateCategories(updatedCategories);
          toast.success("Category Deleted Successfully");
        }
      } catch (error) {
        console.log("Error: ", error);
        toast.error(
          "To remove a category, delete all products under the category in Products, Cart, and Wishlist.",
          { autoClose: 5000 }
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-center">
      {categories.map((category) => (
        <div
          key={category.id}
          className="border border-[#0B3954] p-4 rounded shadow bg-white"
        >
          <img
            src={category.image}
            alt={category.name}
            className="h-[150px] md:h-[200px] m-auto object-contain"
          />
          <h2 className="text-lg font-bold">{category.name}</h2>

          <div className="flex justify-end gap-3 my-3">
            <button
              className="flex items-center gap-2 text-xs bg-[#E3655B] hover:bg-red-600 text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
              onClick={() => handleDeleteCategory(category.id)}
              title="Delete"
            >
              <MdDeleteForever />
              <i className="hidden md:inline">Delete</i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesToManage;
