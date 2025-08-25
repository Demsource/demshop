import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  tryAddToCart,
  tryClearingCart,
  tryDeleteCartItem,
} from "../../services/api/cart";
import {
  addToCart,
  clearCart,
  removeFromCart,
  type CartItem,
} from "../../store/slices/cartSlice";
import SingleCartItem from "../../components/SingleCartItem";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart: React.FC = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { items, total, itemCount } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (cartItem: CartItem) => {
    if (token) {
      try {
        const { status, data } = await tryAddToCart(token, cartItem.productId);

        if (status === 201) {
          const newCartItem = {
            id: data?.id || cartItem?.id,
            productId: data?.cartProduct?.id || cartItem?.productId,
            name: data?.cartProduct?.title || cartItem?.name,
            description:
              data?.cartProduct?.description || cartItem?.description,
            price:
              data?.cartProduct?.salePrice ||
              data?.cartProduct?.price ||
              cartItem?.price,
            image: data?.cartProduct?.image || cartItem?.image,
            quantity: data?.count || cartItem?.quantity || 1,
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

  const handleClearCart = async () => {
    if (token) {
      try {
        const status = await tryClearingCart(token);
        if (status === 201) {
          dispatch(clearCart());
          toast.success("Cart Is Now Empty");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  const redirectTo = useMemo(
    () => (!user || !token ? "/signin" : "/checkout"),
    [user, token]
  );

  const handleCheckout = () => {
    navigate(redirectTo);
  };

  const handleGoShopping = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B3954] mb-2">Cart</h1>
          <p className="text-[#087E8B]">Your chosen cart products</p>
        </div>

        <div className="flex justify-center">
          {items.length === 0 ? (
            <div className="flex justify-center w-full">
              <p className="bg-white border-1 border-[#087E8B] rounded-2xl px-10 py-5 shadow-[4px_4px_8px_#087E8B4A]">
                Your cart is empty.{" "}
                <Link
                  to="/products"
                  className="text-[#0B3954] hover:text-[#087E8B] font-bold"
                >
                  Browse products...
                </Link>
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center items-start gap-5">
                <ul className="bg-white w-[450px] sm:w-[600px] rounded-2xl p-5">
                  <h4 className="pb-2">My Cart</h4>
                  {items.map((item) => (
                    <SingleCartItem
                      key={item.id}
                      item={item}
                      handleAddToCart={handleAddToCart}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  ))}
                  <div className="border-t-1 border-t-[#BFD7EA] pt-5">
                    <button
                      className="flex justify-center items-center gap-2 text-xs bg-[#E3655B] hover:bg-red-600 text-white font-bold px-3 py-2 rounded-lg w-full cursor-pointer"
                      onClick={handleClearCart}
                      title="Clear"
                    >
                      Clear Cart
                    </button>
                  </div>
                </ul>

                <div className="bg-white w-[350px] rounded-2xl p-5">
                  <h4 className="border-b-1 border-b-[#0B3954] pb-2">
                    Cart Summary
                  </h4>

                  <div className="flex justify-between mt-5">
                    <span>Total</span>
                    <b>${total}</b>
                  </div>

                  <div className="flex justify-between text-sm mt-5">
                    <span>Quantity</span>
                    <span>{itemCount}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#1376f4] hover:bg-[#0B3954] text-white text-sm font-bold px-3 py-2 mt-5 rounded-lg cursor-pointer"
                  >
                    Proceed To Checkout
                  </button>
                  <button
                    onClick={handleGoShopping}
                    className="w-full border border-[#1376f4] bg-[#fff] hover:bg-[#0B3954] hover:text-white text-[#1376f4] text-sm font-bold px-3 py-2 mt-2 rounded-lg cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
