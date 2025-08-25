import { useCallback, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { trySignUp } from "../../services/api/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const SignUp = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const navigate = useNavigate();

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
      const status = await trySignUp(formData);
      if (status === 201) {
        setTimeout(() => {
          navigate("/signin");
        }, 1000);

        toast.success("Successfully Signed Up!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  if (user && token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#BFD7EA] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl p-10 shadow-[4px_4px_8px_#087E8B4A] m-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0B3954]">Sign Up</h2>
          <p className="mt-2 text-[#087E8B] font-bold">Make an Account</p>
        </div>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name" className="block mb-2 font-medium">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="flex h-10 w-full rounded-md border px-3 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#087E8B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              autoComplete="first_name"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 font-medium">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="flex h-10 w-full rounded-md border px-3 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#087E8B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              autoComplete="last_name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border px-3 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#087E8B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="block mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter your last name"
              className="flex h-10 w-full rounded-md border px-3 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#087E8B] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              autoComplete="phone_number"
              min="0"
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#1376f4] font-bold rounded-md p-2 mt-4 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p className="text-[#0B3954]">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#1376f4] hover:text-blue-800 font-bold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
