import React from "react";
import { FaCog } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { MdAdminPanelSettings, MdFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  return (
    <nav className="min-h-screen w-[65px] md:w-[145px]">
      <ul className="fixed space-y-2 mt-10 border-4 border-[#087E8B] border-l-0 rounded-r-2xl bg-[#BFD7EA] shadow-[4px_4px_8px_#087E8B4A]">
        <li>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) => {
              return `flex items-center gap-2 hover:text-[#087E8B] cursor-pointer  p-4 ${
                isActive ? "bg-[#087E8B] text-white hover:text-[#BFD7EA]" : ""
              } `;
            }}
            title="Orders"
          >
            <LuPackageCheck />
            <i className="hidden md:inline">Orders</i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/wishlist"
            className={({ isActive }) => {
              return `flex items-center gap-2 hover:text-[#087E8B] cursor-pointer  p-4  ${
                isActive ? "bg-[#087E8B] text-white hover:text-[#BFD7EA]" : ""
              } `;
            }}
            title="Wishlist"
          >
            <MdFavorite />
            <i className="hidden md:inline">Wishlist</i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/settings"
            className={({ isActive }) => {
              return `flex items-center gap-2 hover:text-[#087E8B] cursor-pointer  p-4  ${
                isActive ? "bg-[#087E8B] text-white hover:text-[#BFD7EA]" : ""
              } `;
            }}
            title="Settings"
          >
            <FaCog />
            <i className="hidden md:inline">Settings</i>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/admin"
            className={({ isActive }) => {
              return `flex items-center gap-2 hover:text-[#087E8B] cursor-pointer  p-4  ${
                isActive ? "bg-[#087E8B] text-white hover:text-[#BFD7EA]" : ""
              } `;
            }}
            title="Admin"
          >
            <MdAdminPanelSettings />
            <i className="hidden md:inline">Admin</i>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
