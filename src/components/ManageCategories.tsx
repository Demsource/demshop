import React, { useEffect, useState } from "react";
import {
  tryGettingCategories,
  type CategoryInterface,
} from "../services/api/category";
import { IoMdAddCircle } from "react-icons/io";
import CategoriesToManage from "./CategoriesToManage";
import AddCategoryPopUp from "./AddCategoryPopUp";

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [isOpenAddCategories, setIsOpenAddCategories] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: CategoryInterface[] = await tryGettingCategories();
        updateCategories(response);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchCategories();
  }, []);

  const updateCategories = (updatedCategories: CategoryInterface[]) => {
    setCategories(updatedCategories);
  };

  const handleAddCategory = async () => {
    setIsOpenAddCategories(true);
  };

  const handleCloseAddCategory = async () => {
    setIsOpenAddCategories(false);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end mb-5">
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 text-sm bg-[#1376f4] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
        >
          <IoMdAddCircle />
          Add Category
        </button>
      </div>

      <CategoriesToManage
        categories={categories}
        updateCategories={updateCategories}
      />

      <AddCategoryPopUp
        isOpenAddCategories={isOpenAddCategories}
        handleCloseAddCategory={handleCloseAddCategory}
        updateCategories={updateCategories}
      />
    </div>
  );
};

export default ManageCategories;
