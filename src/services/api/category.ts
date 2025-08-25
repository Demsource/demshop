import axios from "axios";

const API_URL = "https://di-final-api.vercel.app/product-category";

export interface CategoryInterface {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
}

export const tryGettingCategoryNames = async (): Promise<string[]> => {
  try {
    const response = await axios.get(API_URL);
    const result = await response.data.map(
      (item: CategoryInterface) => item.name
    );

    return result;
  } catch (error) {
    throw new Error("Failed to get Category Names");
  }
};

export const tryGettingCategories = async (): Promise<CategoryInterface[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get Categories");
  }
};

export const tryAddCategory = async (
  token: string,
  addedCategory: Partial<CategoryInterface>
): Promise<number> => {
  try {
    const response = await axios.post(API_URL, addedCategory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status;
  } catch (error) {
    throw new Error("Failed to Add Category");
  }
};

export const tryDeleteCategory = async (
  token: string,
  categoryId: string
): Promise<number> => {
  try {
    const response = await axios.delete(API_URL + "/" + categoryId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status;
  } catch (error) {
    throw new Error("Failed to Add Category");
  }
};
