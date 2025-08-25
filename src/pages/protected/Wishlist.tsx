import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import SingleWishlistProduct from "../../components/SingleWishlistProduct";
import type { ProductInterface } from "../../services/api/products";
import { tryAddToCart } from "../../services/api/cart";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { tryDeletingWishlistItem } from "../../services/api/wishlist";
import { removeFromWishlist } from "../../store/slices/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist: React.FC = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const token = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch();

  console.log(wishlist);

  const handleAddToCart = async (
    product: ProductInterface,
    wishlistItemId: string
  ) => {
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
          handleRemoveFromWishlist(wishlistItemId);
          toast.success("Wishlist item successfully added to cart");
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
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>

      {!wishlist?.length && (
        <div className="flex justify-center w-full">
          <p className="bg-white border-1 border-[#087E8B] rounded-2xl px-10 py-5 shadow-[4px_4px_8px_#087E8B4A]">
            Your wishlist is empty.{" "}
            <Link
              to="/products"
              className="text-[#0B3954] hover:text-[#087E8B] font-bold"
            >
              Browse and save products...
            </Link>
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-center">
        {wishlist.map((product) => (
          <SingleWishlistProduct
            key={product.id}
            wishlistItem={product}
            handleAddToCart={handleAddToCart}
            handleRemoveFromWishlist={handleRemoveFromWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
