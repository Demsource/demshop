import React from "react";
import {
  FaCarSide,
  FaCheckCircle,
  FaHeadphonesAlt,
  FaWallet,
} from "react-icons/fa";

const Services: React.FC = () => {
  const ServicesData = [
    {
      id: 1,
      icon: <FaCarSide className="text-4xl md:text-5xl text-[#087E8B]" />,
      title: "Free Shipping",
      description: "Free Shipping On All Orders",
      dataAos: "flip-left",
    },
    {
      id: 2,
      icon: <FaCheckCircle className="text-4xl md:text-5xl text-[#087E8B]" />,
      title: "Safe Money",
      description: "30 Days Money Back",
      dataAos: "flip-right",
    },
    {
      id: 3,
      icon: <FaWallet className="text-4xl md:text-5xl text-[#087E8B]" />,
      title: "Secure Payment",
      description: "All Payment Secure",
      dataAos: "flip-right",
    },
    {
      id: 4,
      icon: <FaHeadphonesAlt className="text-4xl md:text-5xl text-[#087E8B]" />,
      title: "Online Supoort 24/7",
      description: "Technical Support 24/7",
      dataAos: "flip-left",
    },
  ];

  return (
    <div>
      <div className="container my-14 md:my-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
          {ServicesData.map((service, i) => (
            <div
              data-aos={service.dataAos}
              data-aos-delay={`${200 * i}`}
              key={service.id}
              className="flex flex-col items-start sm:flex-row gap-4"
            >
              {service.icon}
              <div>
                <h2 className="lg:text-xl font-bold">{service.title}</h2>
                <h2 className="text-[#0B3954] text-sm">
                  {service.description}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
