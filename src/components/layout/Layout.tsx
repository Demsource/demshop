import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { ToastContainer, Zoom } from "react-toastify";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </div>
  );
};

export default Layout;
