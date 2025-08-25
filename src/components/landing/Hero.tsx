import React from "react";
import Slider from "react-slick";
import type { ProductInterface } from "../../services/api/products";
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "../common/Button";

interface heroLoaderData {
  heroData: ProductInterface[];
}

const Hero: React.FC = () => {
  const { heroData } = useLoaderData() as heroLoaderData;
  const navigate = useNavigate();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="container mt-10">
      <div className="overflow-hidden rounded-3xl min-h-[110%] bg-gradient-to-r from-[#BFD7EA]/80 to-white/100">
        {heroData?.length ? (
          <Slider {...settings}>
            {heroData.map((product) => (
              <div key={product.id} className="outline-none">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col m-10 gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <h2
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-2xl sm:text-6xl lg:text-2xl text-[#087E8B] font-bold"
                    >
                      Top Brand
                    </h2>
                    <h2
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl sm:text-6xl lg:text-7xl text-[#0B3954] font-bold"
                    >
                      {product.title}
                    </h2>
                    <h2
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl uppercase text-white sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold"
                    >
                      {product.category_name}
                    </h2>
                    <div
                      data-aos="fade-up"
                      data-aos-offset="0"
                      data-aos-duration="500"
                      data-aos-delay="300"
                    >
                      <Button
                        title={product.category_name}
                        text="Shop By Category"
                        bgColor="bg-[#087E8B]"
                        textColor="text-white"
                        handler={() =>
                          navigate(
                            `/products?categoryName=${product.category_name}`
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="order-1 sm:order-2 flex justify-center items-center">
                    <div data-aos="zoom-in" data-aos-once="true">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-[300px] sm:w-[450px] h-[300px] sm:h-450px md:scale-110 lg:scale-120 object-contain mx-auto relative z-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="m-10 text-center font-bold text-[#0B3954]">
            Please create categories: Laptops, BCIs and TVs and add at least one
            product in each of them in order to see a working slider here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
