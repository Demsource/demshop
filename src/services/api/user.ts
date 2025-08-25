import axios from "axios";

const API_URL = "https://di-final-api.vercel.app/user";

export interface UserInterface {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  verified: boolean;
  role: string;
  password: string;
  refresh_token: string;
}

export const tryFetchingUser = async (
  token: string
): Promise<UserInterface> => {
  try {
    const response = await axios.get(API_URL + "/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get current user");
  }
};

export const tryUpdatingUser = async (
  token: string,
  updatedUserDetails: Partial<UserInterface>
): Promise<UserInterface> => {
  try {
    const response = await axios.put(API_URL, updatedUserDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to update current user");
  }
};
