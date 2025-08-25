import { useCallback, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { tryLogin } from "../../services/api/auth";
import { tryFetchingUser } from "../../services/api/user";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import type { RootState } from "../../store";

const SignIn = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await tryLogin(formData);
      const currentUser = await tryFetchingUser(data.access_token);

      const user = {
        id: currentUser.id,
        email: currentUser.email,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        phone_number: currentUser.phone_number,
      };

      dispatch(loginSuccess({ user, token: data.access_token }));

      setTimeout(() => {
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo);
      }, 1000);

      toast.success("Successfully Signed In!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.log(err);
    }
  };

  if (user && token) {
    return <Navigate to={location.state?.from?.pathname || "/"} />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#BFD7EA] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl p-10 shadow-[4px_4px_8px_#087E8B4A] m-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0B3954]">Sign In</h2>
          <p className="mt-2 text-[#087E8B] font-bold">Welcome Back!</p>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border px-3 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#087E8B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="flex h-10 w-full rounded-md border px-3 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#087E8B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#1376f4] font-bold rounded-md p-2 mt-4 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <p className="text-[#0B3954]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#1376f4] hover:text-blue-800 font-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
