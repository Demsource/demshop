import React, { useState } from "react";
import {
  tryAddCategory,
  tryGettingCategories,
  type CategoryInterface,
} from "../services/api/category";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface AddCategoryPopUpInterface {
  isOpenAddCategories: boolean;
  handleCloseAddCategory: () => void;
  updateCategories: (updatedCategories: CategoryInterface[]) => void;
}

const AddCategoryPopUp: React.FC<AddCategoryPopUpInterface> = ({
  isOpenAddCategories,
  handleCloseAddCategory,
  updateCategories,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (token) {
      try {
        const status = await tryAddCategory(token, formData);

        if (status === 201) {
          const updatedCategories = await tryGettingCategories();
          updateCategories(updatedCategories);

          handleClose();
          toast.success("Successfully Added Category!");
        }
      } catch (error) {
        console.log("Error: ", error);
        toast.error("Something went wrong while adding a category!");
      }
    }
  };

  const handleClose = () => {
    handleCloseAddCategory();
    setFormData({
      name: "",
      image: "",
    });
  };

  return (
    <>
      {isOpenAddCategories ? (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-xs z-50">
          <div className="bg-white p-8 rounded-lg shadow-[4px_4px_8px_#087E8B4A] max-w-sm w-full">
            <h2 className="text-2xl text-[#087E8B] font-bold mb-4">
              Add Category
            </h2>
            <form
              onSubmit={handleSubmitCategory}
              action="#"
              className="space-y-3 my-4"
            >
              <label
                htmlFor="name"
                className="block text-[#0B3954] text-sm font-bold mb-2"
              >
                Category Name
              </label>
              <input
                type="text"
                className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
                name="name"
                id="name"
                placeholder="Category name"
                value={formData?.name}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="image"
                className="block text-[#0B3954] text-sm font-bold mb-2"
              >
                Image URL
              </label>
              <input
                type="text"
                className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
                name="image"
                id="image"
                placeholder="Please provide BG removed PNG"
                value={formData?.image}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full text-sm bg-[#1376f4] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
              >
                Add
              </button>
            </form>
            <button
              onClick={handleClose}
              className="flex justify-center items-center gap-2 w-full text-sm bg-[#E3655B] hover:bg-red-600 text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddCategoryPopUp;
