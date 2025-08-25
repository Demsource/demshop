import React from "react";
import { type CartItem } from "../store/slices/cartSlice";
import { MdDeleteForever } from "react-icons/md";

interface SingleCartItemInterface {
  item: CartItem;
  handleAddToCart: (cartItem: CartItem) => void;
  handleRemoveFromCart: (id: string) => void;
}

const SingleCartItem: React.FC<SingleCartItemInterface> = ({
  item,
  handleAddToCart,
  handleRemoveFromCart,
}) => {
  return (
    <li className="flex justify-between border-t-1 border-t-[#BFD7EA] pt-5 mb-5">
      <div className="flex">
        <img
          src={item.image}
          alt={item.name}
          className="h-[150px] md:h-[200px] m-auto object-contain"
        />

        <div className="flex flex-col mx-5">
          <h5 className="font-semibold">{item.name}</h5>
          <h6 className="text-sm mb-3">{item.description}</h6>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end justify-self-end">
        <p className="font-bold text-xl">${item.price}</p>
        <div className="flex">
          <div className="flex border rounded border-[#0B3954] text-[#0B3954]">
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="px-3 text-white font-bold bg-[#E3655B] cursor-pointer"
            >
              -
            </button>
            <span className="px-3 bg-white">{item.quantity}</span>
            <button
              onClick={() => handleAddToCart(item)}
              className="px-3 text-white font-bold bg-[#6DA34D] cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleCartItem;
