import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import UpdateProfilePopUp from "../../components/UpdateProfilePopUp";
import { FaUser } from "react-icons/fa";

const Settings: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProfileUpdating, setIsProfileUpdating] = useState<boolean>(false);

  const handleOpenUpdateProfilePopUp = (): void => {
    setIsProfileUpdating(true);
  };

  const handleCloseUpdateProfilePopUp = (): void => {
    setIsProfileUpdating(false);
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
      <div className="flex justify-end">
        <button
          onClick={handleOpenUpdateProfilePopUp}
          className="bg-[#1376f4] hover:bg-[#0B3954] text-white font-bold px-3 py-2 rounded-lg cursor-pointer"
        >
          Update Profile
        </button>
      </div>

      <div className="flex items-center mt-6 border-2 border-[#087E8B] rounded-2xl p-10 shadow-[4px_4px_8px_#087E8B4A]">
        <div className="space-y-4">
          <div>
            <p className="font-bold">First Name</p>
            <p className="text-muted">{user?.first_name}</p>
          </div>
          <div>
            <p className="font-bold">Last Name</p>
            <p className="text-muted">{user?.last_name}</p>
          </div>
          <div>
            <p className="font-bold">E-mail</p>
            <p className="text-muted">{user?.email}</p>
          </div>
          <div>
            <p className="font-bold">Mobile</p>
            <p className="text-muted">{user?.phone_number}</p>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <FaUser className="text-[#BFD7EA] text-[200px]" />
        </div>
      </div>

      {isProfileUpdating && (
        <UpdateProfilePopUp
          handleCloseUpdateProfilePopUp={handleCloseUpdateProfilePopUp}
        />
      )}
    </div>
  );
};

export default Settings;
