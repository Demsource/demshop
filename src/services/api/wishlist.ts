import axios from "axios";

const API_URL = "https://di-final-api.vercel.app/liked-products";

export const tryGettingWishlistItems = async (token: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed To Get Wishlist Items");
  }
};

export const tryAddingWishlistItem = async (
  token: string,
  productId: string
) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        product_id: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { status: response.status, data: response.data };
  } catch (error) {
    throw new Error("Adding product to Wishlist went wrong");
  }
};

export const tryDeletingWishlistItem = async (
  token: string,
  wishlistItemId: string
) => {
  try {
    const response = await axios.delete(API_URL + `/${wishlistItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status;
  } catch (error) {
    throw new Error("Deleting Wishlist Item Went Wrong");
  }
};
