import React, { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import type { ProductInterface } from "../services/api/products";
import { HiArrowRight } from "react-icons/hi";
import { tryAddToCart, tryDeleteCartItem } from "../services/api/cart";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { toast } from "react-toastify";
import ProductCard from "../components/landing/ProductCard";
import {
  tryAddingWishlistItem,
  tryDeletingWishlistItem,
} from "../services/api/wishlist";
import {
  addToWishlist,
  removeFromWishlist,
  type WishlistItem,
} from "../store/slices/wishlistSlice";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface ProductPropsInterface {
  singleProduct: ProductInterface;
  relatedProductsData: ProductInterface[];
}

const Product: React.FC = () => {
  const { singleProduct, relatedProductsData } =
    useLoaderData() as ProductPropsInterface;

  const { id } = useParams();

  const relatedProducts = relatedProductsData.filter(
    (product) => product.id !== id
  );

  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [singleProductQuantity, setSingleProductQuantity] = useState(0);
  const [cartItemId, setCartItemId] = useState("");

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [savedWishlistItem, setSavedWishlistItem] = useState<
    WishlistItem | undefined
  >();

  const location = useLocation();

  useEffect(() => {
    const count =
      cartItems.find((item) => item.productId === singleProduct.id)?.quantity ||
      0;
    setSingleProductQuantity(count);
  }, [cartItems, singleProduct]);

  useEffect(() => {
    const id =
      cartItems.find((item) => item.productId === singleProduct.id)?.id || "";

    setCartItemId(id);
  }, [cartItems, singleProduct]);

  useEffect(() => {
    const wishlistItem = wishlistItems.find(
      (item) => item.productId === singleProduct.id
    );

    setSavedWishlistItem(wishlistItem);
  }, [wishlistItems, singleProduct]);

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

          savedWishlistItem && handleRemoveFromWishlist(savedWishlistItem.id);

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
        <ul className="flex items-center gap-4">
          <li className="text-[#0B3954] hover:text-[#087E8B]">
            <Link to="/products">Products</Link>
          </li>
          <HiArrowRight />
          <li className="text-[#0B3954] hover:text-[#087E8B]">
            <Link to={`/products?categoryName=${singleProduct.category_name}`}>
              {singleProduct.category_name}
            </Link>
          </li>
          <HiArrowRight />

          <li>{singleProduct.title}</li>
        </ul>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 py-5 sm:h-[400px]">
          <div className="flex justify-center items-center bg-[#fff] border-[#087E8B] border-3 rounded-2xl h-full min-w-[400px]">
            <img
              className="h-full object-cover"
              src={singleProduct.image}
              alt={singleProduct.title}
            />
          </div>

          <div className="flex flex-col justify-start sm:justify-between items-center gap-10 h-full min-h-[400px] sm:min-h-auto w-full">
            <div className="self-start">
              <h2 className="text-3xl text-[#0B3954] font-bold">
                {singleProduct.title}
              </h2>

              <p className="mt-5">{singleProduct.description}</p>
              {singleProduct.salePrice ? (
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-[#0B3954] text-4xl md:text-6xl font-extrabold">
                    ${singleProduct.salePrice}
                  </p>
                  <p className="text-2xl font-bold text-[#E3655B] line-through">
                    ${singleProduct.price}
                  </p>
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-[#0B3954] text-4xl md:text-6xl font-extrabold">
                    ${singleProduct.price}
                  </p>
                </div>
              )}
              <h3 className="text-[#0B3954] font-bold mt-5">
                Category: {singleProduct.category_name}
              </h3>
            </div>

            {!singleProductQuantity &&
              (!!savedWishlistItem ? (
                <button
                  onClick={() => handleRemoveFromWishlist(savedWishlistItem.id)}
                  className="self-start flex items-center gap-2 text-md bg-[#087E8B] hover:bg-[#0B3954] text-white font-bold px-2 py-1 rounded-sm cursor-pointer"
                >
                  <MdFavorite />
                  <i>Unsave From Wishlist</i>
                </button>
              ) : (
                <button
                  onClick={() =>
                    user
                      ? handleAddtoWishlist(singleProduct)
                      : navigate("/signin", {
                          replace: true,
                          state: { from: location },
                        })
                  }
                  className="self-start flex items-center gap-2 text-md bg-[#087E8B] hover:bg-[#0B3954] text-white font-bold px-2 py-1 rounded-sm cursor-pointer"
                >
                  <MdFavoriteBorder />
                  <i>Save To Wishlist</i>
                </button>
              ))}

            <div className="flex w-full">
              {user && singleProductQuantity ? (
                <div className="flex border border-[#0B3954] rounded text-[#0B3954] w-full">
                  <button
                    onClick={() => handleRemoveFromCart(cartItemId)}
                    className="px-3 text-white font-bold bg-[#E3655B] w-1/2 p-4 cursor-pointer"
                  >
                    Remove From Cart
                  </button>
                  <span className="flex items-center font-bold px-3 bg-white">
                    {singleProductQuantity}
                  </span>
                  <button
                    onClick={() => handleAddToCart(singleProduct)}
                    className="px-3 text-white font-bold bg-[#6DA34D] w-1/2 p-4 cursor-pointer"
                  >
                    Add To Cart
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    user
                      ? handleAddToCart(singleProduct)
                      : navigate("/signin", {
                          replace: true,
                          state: { from: location },
                        })
                  }
                  className="py-3 text-white font-bold bg-[#6DA34D] hover:bg-green-900 rounded-2xl w-full cursor-pointer"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <header className="mb-10 max-w-[600px] mt-50">
            <h2 className="text-3xl text-[#0B3954] font-bold lg:text-4xl">
              Related Products
            </h2>
          </header>

          <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-start">
              {relatedProducts.map((relatedProduct, i) => (
                <ProductCard
                  key={relatedProduct.id}
                  aosDelay={i * 200}
                  productCard={relatedProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
