import React, { useState } from "react";
import { tryUpdatingUser, type UserInterface } from "../services/api/user";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { updateProfile } from "../store/slices/authSlice";
import { toast } from "react-toastify";

interface UpdateProfilePopUpInterface {
  handleCloseUpdateProfilePopUp: () => void;
}

const UpdateProfilePopUp: React.FC<UpdateProfilePopUpInterface> = ({
  handleCloseUpdateProfilePopUp,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      try {
        {
          const response = await tryUpdatingUser(token, formData);
          dispatch(updateProfile(response));
          toast.success("Successfully updated a profile")
          handleCloseUpdateProfilePopUp();
        }
      } catch (error) {
        console.log("Error: ", error);
        toast.error("Something went wrong while updating a profile")
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-xs z-50">
      <div className="bg-white p-8 rounded-lg shadow-[4px_4px_8px_#087E8B4A] max-w-sm w-full">
        <h2 className="text-2xl text-[#087E8B] font-bold mb-4">
          Update Profile
        </h2>
        <form
          onSubmit={handleSubmitProfile}
          action="#"
          className="space-y-3 my-4"
        >
          <label
            htmlFor="first_name"
            className="block text-[#0B3954] text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
            name="first_name"
            id="first_name"
            placeholder="First name"
            value={formData?.first_name}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="last_name"
            className="block text-[#0B3954] text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
            name="last_name"
            id="last_name"
            placeholder="Last name"
            value={formData?.last_name}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="phone_number"
            className="block text-[#0B3954] text-sm font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-md"
            name="phone_number"
            id="phone_number"
            placeholder="Phone number"
            value={formData?.phone_number}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="flex justify-center items-center gap-2 w-full text-sm bg-[#1376f4] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
          >
            Update
          </button>
        </form>
        <button
          onClick={handleCloseUpdateProfilePopUp}
          className="flex justify-center items-center gap-2 w-full text-sm bg-[#E3655B] hover:bg-red-600 text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePopUp;
