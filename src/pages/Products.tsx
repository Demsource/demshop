import React, { useState } from "react";
import FilterPanel from "../components/FilterPanel";
import { useLoaderData, useSearchParams } from "react-router-dom";
import type { ProductInterface } from "../services/api/products";
import SingleProduct from "../components/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { tryAddToCart, tryDeleteCartItem } from "../services/api/cart";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";
import {
  tryAddingWishlistItem,
  tryDeletingWishlistItem,
} from "../services/api/wishlist";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/slices/wishlistSlice";
import Pagination from "../components/Pagination";

interface ProductsLoaderDataInterface {
  products: ProductInterface[];
  total: number;
}

const Products: React.FC = () => {
  const { products, total } = useLoaderData() as ProductsLoaderDataInterface;
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const [pageSize, setPageSize] = useState<number>(
    Number(searchParams.get("pageSize") || 10)
  );
  const pageSizeOptions = [10, 15, 20, 30, 40];

  const changePageSize = (value: string) => {
    setPageSize(Number(value));
    searchParams.set("page", "1");
    searchParams.set("pageSize", value);

    setSearchParams(searchParams);
  };

  const handleAddToCart = async (product: ProductInterface) => {
    if (token) {
      try {
        const { status, data } = await tryAddToCart(token, product.id);

        if (status === 201) {
          const newCartItem = {
            id: data?.id,
            productId: data?.cartProduct?.id || product?.id,
            name: data?.cartProduct?.title || product?.title,
            description: data?.cartProduct?.description || product?.description,
            price:
              data?.cartProduct?.salePrice ||
              data?.cartProduct?.price ||
              product.salePrice ||
              product.price,
            image: data?.cartProduct?.image || product.image,
            quantity: data?.count || 1,
          };
          dispatch(addToCart(newCartItem));
          toast.success("Successfully Added To Cart");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  const handleRemoveFromCart = async (cartItemId: string) => {
    if (token) {
      try {
        const status = await tryDeleteCartItem(token, cartItemId);

        if (status === 200) {
          dispatch(removeFromCart(cartItemId));
          toast.success("Successfully Removed From Cart");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  const handleAddtoWishlist = async (product: ProductInterface) => {
    if (token) {
      try {
        const { status, data } = await tryAddingWishlistItem(token, product.id);
        if (status === 201) {
          const newWishlistItem = {
            id: data?.id,
            productId: data?.product_id || product?.id,
            title: data?.likedProduct?.title || product?.title,
            description:
              data?.likedProduct?.description || product?.description,
            image: data?.likedProduct?.image || product?.image,
            price: data?.likedProduct?.price || product?.price,
            salePrice: data?.likedProduct?.salePrice || product?.salePrice,
            categoryName:
              data?.likedProduct?.category_name || product?.category_name,
          };

          dispatch(addToWishlist(newWishlistItem));
          toast.success("Successfully Added To Wishlist");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  const handleRemoveFromWishlist = async (wishlistItemId: string) => {
    if (token) {
      try {
        const status = await tryDeletingWishlistItem(token, wishlistItemId);

        if (status === 200) {
          dispatch(removeFromWishlist(wishlistItemId));
          toast.success("Item successfully removed from wishlist");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B3954] mb-2">Products</h1>
          <p className="text-[#087E8B]">Choose your preferred products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>
        </div>

        <div className="lg:col-span-3 mt-10 mb-20">
          <div className="flex flex-col items-center">
            <div className="mb-6 flex justify-center w-full">
              {products.length ? (
                <div className="flex flex-col items-center w-full">
                  <p className="text-[#0B3954]">
                    Shown <b>{products.length}</b> products out of{" "}
                    <b>{total}</b>
                  </p>

                  <div className="flex justify-end w-full">
                    <div className="flex items-center gap-2 mb-4">
                      <label htmlFor="pageSize" className="text-[#0B3954]">
                        Products per page
                      </label>
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
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-[#0B3954]">No products to show</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-center">
              {products.map((product) => (
                <SingleProduct
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleAddtoWishlist={handleAddtoWishlist}
                  handleRemoveFromWishlist={handleRemoveFromWishlist}
                />
              ))}
            </div>

            <Pagination
              page={+currentPage}
              pageSize={+pageSize}
              totalProducts={+total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
