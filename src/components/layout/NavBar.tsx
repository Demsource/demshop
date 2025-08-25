import React, { useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaCog, FaShoppingCart, FaStoreAlt, FaUser } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { MdAdminPanelSettings, MdFavorite } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const NavBar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const itemCount = useSelector((state: RootState) => state.cart.itemCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logout());
    toast.success("Successfully Logged Out!");
  };

  const onCartClickRedirectTo = useMemo(
    () => (!user || !token ? "/signin" : "/cart"),
    [user, token]
  );

  const handleOnCartClick = () => navigate(onCartClickRedirectTo);

  return (
    <header className="relative bg-[#BFD7EA] border-b-2 border-b-[#0B3954] z-10">
      <div className="flex justify-center py-4">
        <div className="container flex justify-between">
          <div className="flex flex-col lg:flex-row items-center lg:gap-20">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-[#0B3954] hover:text-[#087E8B] text-md sm:text-2xl lg:text-3xl uppercase ml-5"
            >
              <FaStoreAlt />
              Demshop
            </Link>
            <nav className="ml-5 lg:ml-0">
              <ul className="flex items-center gap-8 font-bold text-[#087E8B]">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => {
                      return `inline-block hover:text-[#0B3954] duration-300 ${
                        isActive
                          ? "bg-[#087E8B] text-white hover:text-[#BFD7EA] px-1 rounded"
                          : ""
                      } `;
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) => {
                      return `inline-block hover:text-[#0B3954] duration-300 ${
                        isActive
                          ? "bg-[#087E8B] text-white hover:text-[#BFD7EA] px-1 rounded"
                          : ""
                      } `;
                    }}
                  >
                    Products
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex justify-between items-center gap-4 mr-6">
            <div className="relative group">
              <input
                id="search"
                name="search"
                type="text"
                placeholder="Search..."
                className="w-0 group-hover:w-[100px] sm:group-hover:w-[200px] lg:group-hover:w-[300px] transition-all duration-300 rounded-full group-hover:border group-hover:border-[#0B3954] px-3 py-1 focus:outline-none pr-9"
              />
              <CiSearch className="text-xl text-[#0B3954] group-hover:text-[#087E8B] absolute top-1/2 -translate-y-1/2 right-3 duration-300" />
            </div>
            <button
              onClick={handleOnCartClick}
              className="relative p-3 cursor-pointer"
            >
              <FaShoppingCart className="text-xl text-[#0B3954] hover:text-[#087E8B]" />
              {!user || !token ? (
                <></>
              ) : (
                itemCount !== 0 && (
                  <div className="w-4 h-4 bg-[#E3655B] text-white rounded-full absolute top-0 right-0 flex justify-center items-center text-xs">
                    {itemCount}
                  </div>
                )
              )}
            </button>
            <button className="relative flex items-center gap-2 text-[#0B3954] font-bold group">
              {user ? (
                <>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#087E8B]">
                    <FaUser className="text-xl" />
                    <div>My Account</div>
                  </div>

                  <div className="hidden group-hover:block absolute z-10 bg-white rounded-lg top-[100%] right-0 text-sm w-[250px] shadow-[4px_4px_8px_#087E8B4A]">
                    <h5 className="mt-3">
                      <span className="text-[#087E8B]">Hello,</span>{" "}
                      {user.first_name} {user.last_name}
                    </h5>
                    <ul className="flex flex-wrap justify-center items-center gap-x-10 gap-y-2 mt-4 mb-4">
                      <div className="space-y-2">
                        <li>
                          <NavLink
                            to="/profile/orders"
                            className={({ isActive }) => {
                              return `flex items-center gap-2 hover:text-[#087E8B] cursor-pointer ${
                                isActive
                                  ? "bg-[#087E8B] text-white hover:text-[#BFD7EA] px-1 rounded"
                                  : ""
                              } `;
                            }}
                          >
                            <LuPackageCheck />
                            Orders
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/profile/settings"
                            className={({ isActive }) => {
                              return `flex items-center gap-2 hover:text-[#087E8B] cursor-pointer ${
                                isActive
                                  ? "bg-[#087E8B] text-white hover:text-[#BFD7EA] px-1 rounded"
                                  : ""
                              } `;
                            }}
                          >
                            <FaCog />
                            Settings
                          </NavLink>
                        </li>
                      </div>
                      <div className="space-y-2">
                        <li>
                          <NavLink
                            to="/profile/wishlist"
                            className={({ isActive }) => {
                              return `flex items-center gap-2 hover:text-[#087E8B] cursor-pointer ${
                                isActive
                                  ? "bg-[#087E8B] text-white hover:text-[#BFD7EA] px-1 rounded"
                                  : ""
                              } `;
                            }}
                          >
                            <MdFavorite />
                            Wishlist
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/profile/admin"
                            className={({ isActive }) => {
                              return `flex items-center gap-2 hover:text-[#087E8B] cursor-pointer ${
                                isActive
                                  ? "bg-[#087E8B] text-white hover:text-[#BFD7EA] px-1 rounded"
                                  : ""
                              } `;
                            }}
                          >
                            <MdAdminPanelSettings />
                            Admin
                          </NavLink>
                        </li>
                      </div>
                      <li
                        onClick={Logout}
                        className="flex items-center gap-2 text-[#E3655B] hover:bg-[#E3655B] hover:text-white cursor-pointer mt-2 px-1 rounded"
                      >
                        <HiOutlineLogout />
                        Logout
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="flex items-center gap-2 cursor-pointer hover:text-[#087E8B]"
                  >
                    <FaUser className="text-xl" />
                    <div>Login</div>
                  </Link>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
