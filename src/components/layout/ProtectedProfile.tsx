import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const ProtectedProfile: React.FC = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default ProtectedProfile;
