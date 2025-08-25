import React, { useEffect, useState } from "react";
import type { ProductInterface } from "../services/api/products";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { FaAngleDown, FaAngleUp, FaShoppingCart } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { WishlistItem } from "../store/slices/wishlistSlice";

interface SingleProductInterface {
  product: ProductInterface;
  handleAddToCart: (product: ProductInterface) => void;
  handleRemoveFromCart: (cartItemId: string) => void;
  handleAddtoWishlist: (wishlistItem: ProductInterface) => void;
  handleRemoveFromWishlist: (wishlistItemId: string) => void;
}

const SingleProduct: React.FC<SingleProductInterface> = ({
  product,
  handleAddToCart,
  handleRemoveFromCart,
  handleAddtoWishlist,
  handleRemoveFromWishlist,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const navigate = useNavigate();
  const location = useLocation();

  const [singleProductQuantity, setSingleProductQuantity] = useState(0);

  const [cartItemId, setCartItemId] = useState("");

  const [savedWishlistItem, setSavedWishlistItem] = useState<
    WishlistItem | undefined
  >();

  useEffect(() => {
    const count =
      cartItems.find((item) => item.productId === product.id)?.quantity || 0;
    setSingleProductQuantity(count);
  }, [cartItems, product]);

  useEffect(() => {
    const id =
      cartItems.find((item) => item.productId === product.id)?.id || "";

    setCartItemId(id);
  }, [cartItems, product]);

  useEffect(() => {
    const wishlistItem = wishlistItems.find(
      (item) => item.productId === product.id
    );

    setSavedWishlistItem(wishlistItem);
  }, [wishlistItems, product]);

  return (
    <div className="relative group border border-[#0B3954] p-4 rounded shadow bg-white">
      <div>
        <img
          className="h-[200px] md:h-[300px] m-auto object-contain"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div
        className="hover:bg-[#BFD7EA] p-5 cursor-pointer"
        title="Visit Product Page"
      >
        <Link to={`/product/${product.id}`}>
          <h2 className="text-lg font-bold mt-2">{product.title}</h2>
          <p className="text-[#087E8B]">{product.description}</p>
          <p
            className={`font-semibold ${
              product.salePrice ? "line-through text-[#E3655B]" : ""
            }`}
          >
            Price: {product.price}₾
          </p>
          {product.salePrice && (
            <p className="font-semibold text-[#6DA34D]">
              Sale Price: {product.salePrice}₾
            </p>
          )}
          <p className="text-sm text-[#087E8B]">
            Category: {product.category_name}
          </p>
        </Link>
      </div>

      <div className="absolute flex justify-center items-center top-2 right-2">
        <div
          className={`${
            !user || singleProductQuantity === 0
              ? "hidden group-hover:flex"
              : "flex"
          } flex-col gap-3 justify-center items-center`}
        >
          <div className="flex flex-col">
            <div className="relative p-3">
              <FaShoppingCart className="relative transform scale-x-[-1] text-3xl text-[#0B3954] z-20" />
              {user && singleProductQuantity ? (
                <div className="w-4 h-4 bg-[#E3655B] text-white rounded-full absolute top-0 right-0 flex justify-center items-center text-xs p-3">
                  {singleProductQuantity}
                </div>
              ) : (
                ""
              )}
              <FaAngleUp
                onClick={() =>
                  user
                    ? (() => {
                        handleAddToCart(product);
                        savedWishlistItem &&
                          handleRemoveFromWishlist(savedWishlistItem.id);
                      })()
                    : navigate("/signin", {
                        replace: true,
                        state: { from: location },
                      })
                }
                className="absolute flex items-center gap-2 bg-white border border-[#1376f4] text-[#1376f4] hover:text-[#0B3954] text-2xl font-bold p-1 rounded-full top-0 left-0 cursor-pointer"
              />
              {user && (
                <FaAngleDown
                  onClick={() =>
                    singleProductQuantity > 0 &&
                    handleRemoveFromCart(cartItemId)
                  }
                  className={`absolute ${
                    singleProductQuantity < 1 ? "hidden" : "flex"
                  } items-center gap-2 bg-white border border-[#E3655B] text-[#E3655B] hover:text-red-600 text-2xl font-bold p-1 rounded-full bottom-0 left-0 cursor-pointer`}
                />
              )}
            </div>
          </div>
          {!singleProductQuantity &&
            (!!savedWishlistItem ? (
              <button
                onClick={() => handleRemoveFromWishlist(savedWishlistItem.id)}
                className="flex items-center gap-2 text-md bg-[#087E8B] hover:bg-[#0B3954] text-white font-bold px-2 py-1 rounded-full cursor-pointer"
              >
                <MdFavorite />
                <i className="hidden md:inline">Unsave</i>
              </button>
            ) : (
              <button
                onClick={() =>
                  user
                    ? handleAddtoWishlist(product)
                    : navigate("/signin", {
                        replace: true,
                        state: { from: location },
                      })
                }
                className="flex items-center gap-2 text-md bg-[#087E8B] hover:bg-[#0B3954] text-white font-bold px-2 py-1 rounded-full cursor-pointer"
              >
                <MdFavoriteBorder />
                <i className="hidden md:inline">Save</i>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
