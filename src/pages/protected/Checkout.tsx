import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import axios from "axios";
import { clearCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";

const Checkout: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const cart = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuy = async () => {
    try {
      const response = await axios.post(
        "https://di-final-api.vercel.app/purchases",
        {
          totalPrice: cart.total,
          totalItems: cart.itemCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        dispatch(clearCart());
        toast.success("Successfully Bought Products");
        navigate("/profile/orders");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="min-h-screen w-full pb-20">
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B3954] mb-2">Checkout</h1>
          <p className="text-[#087E8B]">Buy products</p>
        </div>

        {!cart.itemCount || !cart.total ? (
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
          <div className="self-center flex flex-col bg-white p-8 rounded-lg shadow-[4px_4px_8px_#087E8B4A] w-full max-w-lg">
            <h1 className="self-center border-b-1 border-b-[#BFD7EA] pb-5 text-3xl font-serif text-center font-bold mb-6 w-full">
              Pay
            </h1>

            <div className="p-6 rounded">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <p className="mb-2">
                Total Items: <span className="font-bold">{cart.itemCount}</span>
              </p>
              <p className="mb-4">
                Total Price: <span className="font-bold">{cart.total}₾</span>
              </p>
            </div>

            <div className="w-full">
              <Button
                text="Buy"
                title="Buy"
                bgColor="bg-[#6DA34D]"
                textColor="text-white"
                handler={handleBuy}
                otherStyles="hover:bg-green-900 w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
