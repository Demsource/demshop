import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import {
  tryDeleteProduct,
  tryGettingProducts,
  type ProductInterface,
} from "../services/api/products";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { toast } from "react-toastify";

interface ProductsToManageInterface {
  products: ProductInterface[];
  updateProducts: (updatedProducts: ProductInterface[]) => void;
  handleSelectProduct: (product: ProductInterface) => void;
}

const ProductsToManage: React.FC<ProductsToManageInterface> = ({
  products,
  updateProducts,
  handleSelectProduct,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const handleDeleteProduct = async (productId: string) => {
    if (token) {
      try {
        const { status, message } = await tryDeleteProduct(token, productId);

        if (status === 200) {
          const updatedProducts = await tryGettingProducts();
          updateProducts(updatedProducts.products);
          toast.success(message);
        }
      } catch (error) {
        console.log("Error: ", error);
        toast.error("Something went wrong while deleting a product");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-[#0B3954] p-4 rounded shadow bg-white"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-[150px] md:h-[200px] m-auto object-contain"
          />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-[#087E8B]">{product.description}</p>
          <p
            className={`font-semibold ${
              product.salePrice ? "line-through text-[#E3655B]" : ""
            }`}
          >
            Price: {product.price}₾
          </p>
          {product.salePrice ? (
            <p className="font-semibold text-[#6DA34D]">
              Sale Price: {product.salePrice}₾
            </p>
          ) : (
            ""
          )}
          <p className="text-sm text-[#087E8B]">
            Category: {product.category_name}
          </p>
          <div className="flex justify-end gap-3 my-3">
            <button
              className="flex items-center gap-2 text-xs bg-[#1376f4] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
              onClick={() => handleSelectProduct(product)}
              title="Update"
            >
              <RxUpdate />
              <i className="hidden md:inline">Update</i>
            </button>
            <button
              className="flex items-center gap-2 text-xs bg-[#E3655B] hover:bg-red-600 text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
              onClick={() => handleDeleteProduct(product.id)}
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

export default ProductsToManage;
