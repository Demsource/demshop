import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="py-8 bg-[#BFD7EA] border-t-2 border-t-[#0B3954]">
      <p className="text-center">
        © {new Date().getFullYear()} Demshop - All rights reserved
      </p>
    </div>
  );
};

export default Footer;
