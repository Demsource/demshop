import axios from "axios";

const API_URL = "https://di-final-api.vercel.app/product";

export interface ProductInterface {
  id: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  description: string;
  image: string;
  price: number;
  salePrice: null | number;
  category_name: string;
}

export interface ProductFilters {
  page?: string;
  pageSize?: number;
  minPrice?: string;
  maxPrice?: string;
  onlySales?: string;
  search?: string;
  categoryName?: string;
}

export interface ProductsResponse {
  products: ProductInterface[];
  total: number;
}

export interface DeleteProductResponse {
  status: number;
  message: string;
}

export const tryGettingSingleProduct = async (
  id: string
): Promise<ProductInterface> => {
  try {
    const response = await axios.get(API_URL + "/" + id);

    return response.data;
  } catch (error) {
    throw new Error("Failed to get product");
  }
};

export const tryGettingProducts = async (
  filters: ProductFilters = {}
): Promise<ProductsResponse> => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    });

    const response = await axios.get(API_URL, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get products");
  }
};

export const tryUpdateProduct = async (
  productId: string,
  updatedProduct: Partial<ProductInterface>
): Promise<number> => {
  try {
    const response = await axios.put(
      API_URL,
      { id: productId, ...updatedProduct },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.status;
  } catch (error) {
    throw new Error("Failed to Update Product");
  }
};

export const tryAddProduct = async (
  addedProduct: Partial<ProductInterface>
): Promise<number> => {
  try {
    const response = await axios.post(API_URL, addedProduct, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.status;
  } catch (error) {
    throw new Error("Failed to Add Product");
  }
};

export const tryDeleteProduct = async (
  token: string,
  productId: string
): Promise<DeleteProductResponse> => {
  try {
    const response = await axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        ids: [productId],
      },
    });

    return { status: response.status, message: response.data.message };
  } catch (error) {
    throw new Error("Failed to delete a product");
  }
};
