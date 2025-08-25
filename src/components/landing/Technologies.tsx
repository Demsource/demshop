import React from "react";
import { FaReact } from "react-icons/fa";
import { SiRedux, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";

const Technologies: React.FC = () => {
  return (
    <div className="py-8 px-20 my-24 bg-[#BFD7EA]/80 w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-3 place-items-center place-content-center opacity-50">
          <div data-aos="zoom-out" className="hover:text-[#087E8B]" >
            <SiVite title="Vite" fontSize="50px" />
          </div>
          <div data-aos="zoom-out" data-aos-delay="200" data-aos-duration="1000" className="hover:text-[#087E8B]" >
            <FaReact title="React" fontSize="50px" />
          </div>
          <div data-aos="zoom-out" data-aos-delay="400" data-aos-duration="1000" className="hover:text-[#087E8B]" >
            <SiTypescript title="Typescript" fontSize="50px" />
          </div>
          <div data-aos="zoom-out" data-aos-delay="600" data-aos-duration="1000" className="hover:text-[#087E8B]" >
            <SiRedux title="Redux" fontSize="50px" />
          </div>
          <div data-aos="zoom-out" data-aos-delay="800" data-aos-duration="1000" className="hover:text-[#087E8B]" >
            <SiTailwindcss title="Tailwindcss" fontSize="50px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
