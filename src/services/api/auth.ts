import axios from "axios";

const API_LOGIN_URL = "https://di-final-api.vercel.app/auth/login";

export interface tryLoginInterface {
  access_token: string;
  refresh_token: string;
}

export interface loginFormInterface {
  email: string;
  password: string;
}

export const tryLogin = async (
  formData: loginFormInterface
): Promise<tryLoginInterface> => {
  try {
    const response = await axios.post(API_LOGIN_URL, formData);
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

const API_SIGN_UP_URL = "https://di-final-api.vercel.app/auth/register";

export interface signUpFormInterface {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export const trySignUp = async (
  formData: signUpFormInterface
): Promise<number> => {
  try {
    const response = await axios.post(API_SIGN_UP_URL, formData);
    return response.status;
  } catch (error) {
    throw new Error("Failed to sign up");
  }
};
