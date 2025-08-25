import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-9xl font-bold text-white mt-10">404</h3>
      <p className="font-bold text-[#087E8B] mt-4">Page not found</p>
      <Link
        to="/"
        className="bg-white text-[#0B3954] hover:text-[#087E8B] font-bold rounded-3xl px-4 py-2 mt-2"
      >
        Go to home page
      </Link>
    </div>
  );
};

export default NotFound;
