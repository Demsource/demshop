import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://di-final-api.vercel.app/purchases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      {!orders.length ? (
        <div className="flex justify-center w-full">
          <p className="bg-white border-1 border-[#087E8B] rounded-2xl px-10 py-5 shadow-[4px_4px_8px_#087E8B4A]">
            You don't have any orders.{" "}
            <Link
              to="/products"
              className="text-[#0B3954] hover:text-[#087E8B] font-bold"
            >
              Browse products...
            </Link>
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-[#087E8B]">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Total Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Total Items
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-t border-[#0B3954]">
                  <td className="px-4 py-2 text-sm text-[#0B3954]">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#0B3954]">
                    {order.totalPrice}
                  </td>
                  <td className="px-4 py-2 text-sm text-[#0B3954]">
                    {order.totalItems}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
