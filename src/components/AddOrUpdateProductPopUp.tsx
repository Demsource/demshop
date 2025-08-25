import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { ProductInterface } from "../services/api/products";
import { tryGettingCategoryNames } from "../services/api/category";

interface AddOrUpdateProductPopUpInterface {
  selectedProduct: ProductInterface | null;
  isOpenAddProduct: boolean;
  formData: Partial<ProductInterface>;
  handleSubmitProduct: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleCloseAddOrUpdateProductPopUp: () => void;
}

const AddOrUpdateProductPopUp: React.FC<AddOrUpdateProductPopUpInterface> = ({
  selectedProduct,
  isOpenAddProduct,
  formData,
  handleSubmitProduct,
  handleChange,
  handleCloseAddOrUpdateProductPopUp,
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: string[] = await tryGettingCategoryNames();
        setCategories(response);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {selectedProduct || isOpenAddProduct ? (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-xs z-50">
          <div className="bg-white p-8 rounded-lg shadow-[4px_4px_8px_#087E8B4A] max-w-sm w-full">
            <h2 className="text-2xl text-[#087E8B] font-bold mb-4">
              {(selectedProduct && "Update") || (isOpenAddProduct && "Add")} Product
            </h2>
            <form
              onSubmit={handleSubmitProduct}
              action="#"
              className="space-y-3 my-4"
            >
              <label
                htmlFor="title"
                className="block text-[#0B3954] text-sm font-bold mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
                name="title"
                id="title"
                placeholder="Product name"
                value={formData?.title}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="category"
                className="block text-[#0B3954] text-sm font-bold mb-2"
              >
                Category
              </label>
              <select
                name="category_name"
                id="category_name"
                className="block w-full rounded-lg border border-[#BFD7EA] px-3 py-2.5 text-[#0B3954] focus:border-[#087E8B] focus:outline-none focus:ring-1 focus-ring-[#0B3954]"
                value={formData?.category_name}
                onChange={handleChange}
              >
                <option value="">All Category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <label
                htmlFor="description"
                className="block text-[#0B3954] text-sm font-bold mb-2"
              >
                Product Description
              </label>
              <textarea
                className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
                name="description"
                id="description"
                placeholder="Description"
                value={formData?.description}
                onChange={handleChange}
                required
              ></textarea>
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
              <label
                htmlFor="price"
                className="block text-[#0B3954] text-sm font-bold mb-2"
              >
                Product Price
              </label>
              <input
                type="number"
                className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
                name="price"
                id="price"
                placeholder="Product price"
                value={formData?.price}
                onChange={handleChange}
                min={0}
                required
              />
              <label
                htmlFor="salePrice"
                className="block text-[#0B3954] text-sm font-bold mb-2"
              >
                Product Sale Price
              </label>
              <input
                type="number"
                className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
                name="salePrice"
                id="salePrice"
                placeholder="Product sale price"
                value={formData?.salePrice !== null ? formData.salePrice : ""}
                onChange={handleChange}
                min={0}
              />
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full text-sm bg-[#1376f4] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
              >
                {(selectedProduct && "Update") || (isOpenAddProduct && "Add")}
              </button>
            </form>
            <button
              onClick={handleCloseAddOrUpdateProductPopUp}
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

export default AddOrUpdateProductPopUp;
