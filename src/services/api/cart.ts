import axios from "axios";

const API_URL = "https://di-final-api.vercel.app/cart";

export const tryGettingCartItems = async (token: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed To Get Cart Items");
  }
};

export const tryAddToCart = async (token: string, productId: string) => {
  try {
    const response = await axios.post(
      API_URL,
      { product_id: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { status: response.status, data: response.data };
  } catch (error) {
    throw new Error("Adding Product To Cart Went Wrong");
  }
};

export const tryDeleteCartItem = async (token: string, cartItemId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status;
  } catch (error) {
    throw new Error("Deleting Product From Cart Went Wrong");
  }
};

export const tryClearingCart = async (token: string) => {
  try {
    const response = await axios.post(
      API_URL + "/clear",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.status;
  } catch (error) {
    throw new Error("Clearing Cart Went Wrong");
  }
};
