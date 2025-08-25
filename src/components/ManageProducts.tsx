import React, { useEffect, useState } from "react";
import {
  tryAddProduct,
  tryGettingProducts,
  tryUpdateProduct,
  type ProductInterface,
  type ProductsResponse,
} from "../services/api/products";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import AddOrUpdateProductPopUp from "./AddOrUpdateProductPopUp";
import ProductsToManage from "./ProductsToManage";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductInterface | null>(null);
  const [isOpenAddProduct, setIsOpenAddProduct] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    category_name: "",
    description: "",
    image: "",
    price: 0,
    salePrice: null as number | null,
  });

  const updateProducts = (updatedProducts: ProductInterface[]) => {
    setProducts(updatedProducts);
  };

  const [totalProducts, setTotalProducts] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const [pageSize, setPageSize] = useState<number>(
    Number(searchParams.get("pageSize")) || 10
  );
  const pageSizeOptions = [10, 15, 20, 30, 40];

  const changePageSize = (value: string) => {
    setPageSize(Number(value));
    searchParams.set("page", "1");
    searchParams.set("pageSize", value);

    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: ProductsResponse = await tryGettingProducts({
          page: currentPage,
          pageSize: pageSize,
        });
        updateProducts(response.products);
        setTotalProducts(response.total);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize]);

  const handleSelectProduct = (product: ProductInterface) => {
    setSelectedProduct(product);

    setFormData({
      title: product.title,
      category_name: product.category_name,
      description: product.description,
      image: product.image,
      price: product.price,
      salePrice: product.salePrice,
    });
  };

  const handleAddProduct = () => {
    setIsOpenAddProduct(true);
  };

  const handleCloseAddOrUpdateProductPopUp = () => {
    selectedProduct && setSelectedProduct(null);
    isOpenAddProduct && setIsOpenAddProduct(false);
    setFormData({
      title: "",
      category_name: "",
      description: "",
      image: "",
      price: 0,
      salePrice: null as number | null,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "salePrice"
          ? value
            ? parseInt(value)
            : null
          : type === "number"
          ? +value
          : value,
    }));
  };

  const handleSubmitEditedProduct = async () => {
    // Ensuring selectedProduct is not null and has a valid id (important when "strict" mode is set to "true" (for Linting))
    if (!selectedProduct || !selectedProduct.id) {
      toast.error("Product ID is missing or invalid!");
      return;
    }

    try {
      const status = await tryUpdateProduct(selectedProduct.id, formData);

      if (status === 200) {
        const updatedProducts = await tryGettingProducts();
        updateProducts(updatedProducts.products);

        setSelectedProduct(null);
        setFormData({
          title: "",
          category_name: "",
          description: "",
          image: "",
          price: 0,
          salePrice: null as number | null,
        });
        toast.success("Successfully Updated Product!");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Something went wrong while updating the product!");
    }
  };

  const handleSubmitAddedProduct = async () => {
    try {
      const status = await tryAddProduct(formData);

      if (status === 201) {
        const updatedProducts = await tryGettingProducts();
        updateProducts(updatedProducts.products);

        setIsOpenAddProduct(false);
        setFormData({
          title: "",
          category_name: "",
          description: "",
          image: "",
          price: 0,
          salePrice: null as number | null,
        });
        toast.success("Successfully Added Product!");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Something went wrong while adding a product!");
    }
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

    selectedProduct && handleSubmitEditedProduct();
    isOpenAddProduct && handleSubmitAddedProduct();
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <select
            name="pageSize"
            id="pageSize"
            className="border rounded px-2 py-1 text-[#0B3954] bg-white"
            value={pageSize}
            onChange={(e) => changePageSize(e.target.value)}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <label htmlFor="pageSize" className="text-[#0B3954]">
            Products per page
          </label>
        </div>

        <button
          onClick={handleAddProduct}
          className="self-end flex items-center gap-2 text-sm bg-[#1376f4] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
        >
          <IoMdAddCircle />
          Add Product
        </button>
      </div>

      <ProductsToManage
        products={products}
        updateProducts={updateProducts}
        handleSelectProduct={handleSelectProduct}
      />

      <Pagination
        page={+currentPage}
        pageSize={+pageSize}
        totalProducts={+totalProducts}
      />

      <AddOrUpdateProductPopUp
        selectedProduct={selectedProduct}
        isOpenAddProduct={isOpenAddProduct}
        formData={formData}
        handleSubmitProduct={handleSubmitProduct}
        handleChange={handleChange}
        handleCloseAddOrUpdateProductPopUp={handleCloseAddOrUpdateProductPopUp}
      />
    </div>
  );
};

export default ManageProducts;
