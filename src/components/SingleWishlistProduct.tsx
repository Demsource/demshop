import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import type { WishlistItem } from "../store/slices/wishlistSlice";
import type { ProductInterface } from "../services/api/products";
import ButtonFull from "./common/ButtonFull";

interface SingleWishlistProductInterface {
  wishlistItem: WishlistItem;
  handleAddToCart: (product: ProductInterface, wishlistItemId: string) => void;
  handleRemoveFromWishlist: (cartItemId: string) => void;
}

const SingleWishlistProduct: React.FC<SingleWishlistProductInterface> = ({
  wishlistItem,
  handleAddToCart,
  handleRemoveFromWishlist,
}) => {
  return (
    <div className="relative group border border-[#0B3954] p-4 rounded shadow bg-white">
      <div>
        <img
          className="h-[200px] md:h-[300px] m-auto object-contain"
          src={wishlistItem.image}
          alt={wishlistItem.title}
        />
      </div>

      <div
        className="hover:bg-[#BFD7EA] p-5 cursor-pointer m-3"
        title="Visit Product Page"
      >
        <Link to={`/product/${wishlistItem.productId}`}>
          <h2 className="text-lg font-bold mt-2">{wishlistItem.title}</h2>
          <p className="text-[#087E8B]">{wishlistItem.description}</p>
          <p
            className={`font-semibold ${
              wishlistItem.salePrice ? "line-through text-[#E3655B]" : ""
            }`}
          >
            Price: {wishlistItem.price}₾
          </p>
          {wishlistItem.salePrice && (
            <p className="font-semibold text-[#6DA34D]">
              Sale Price: {wishlistItem.salePrice}₾
            </p>
          )}
          <p className="text-sm text-[#087E8B]">
            Category: {wishlistItem.categoryName}
          </p>
        </Link>
      </div>

      <div className="space-y-3">
        <ButtonFull
          text="Move To Cart"
          title="Add To Cart"
          bgColor="bg-[#087E8B]"
          textColor="text-white"
          icon={<FaShoppingCart className="text-xl text-white" />}
          handler={() => {
            const product = {
              id: wishlistItem.productId,
              title: wishlistItem.title,
              description: wishlistItem.description,
              image: wishlistItem.image,
              price: wishlistItem.price,
              salePrice: wishlistItem.salePrice,
              category_name: wishlistItem.categoryName,
            };

            handleAddToCart(product, wishlistItem.id);
          }}
        />
        <ButtonFull
          text="Remove From Wishlist"
          title="Unsave"
          bgColor="bg-[#0B3954]"
          textColor="text-white"
          icon={<MdFavorite className="text-xl text-white" />}
          handler={() => handleRemoveFromWishlist(wishlistItem.id)}
        />
      </div>
    </div>
  );
};

export default SingleWishlistProduct;
