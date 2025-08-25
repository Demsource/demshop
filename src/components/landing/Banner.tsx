import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

interface BannerInterface {
  BannerDataDerived:
    | {
        id: string;
        discount: string;
        title: string;
        date: string;
        image: string;
        category: string;
        season: string;
        description: string;
        bgColor: string;
      }
    | undefined;
  categoryName: string;
}

const Banner: React.FC<BannerInterface> = ({
  BannerDataDerived,
  categoryName,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center py-6">
      {BannerDataDerived ? (
        <div className="container">
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl bg-[${BannerDataDerived?.bgColor}]`}
          >
            <div className="p-6 sm:p-8">
              <p data-aos="slide-right" className="text-sm">
                {BannerDataDerived?.discount}
              </p>
              <h2
                data-aos="zoom-out"
                className="uppercase text-4xl lg:text-7xl font-bold"
              >
                {BannerDataDerived?.title}
              </h2>
              <p data-aos="fade-up" className="text-sm">
                {BannerDataDerived?.date}
              </p>
            </div>

            <div data-aos="zoom-in" className="h-full flex items-center">
              <img
                src={BannerDataDerived?.image}
                alt={BannerDataDerived?.title}
                className="scale-170 w-[250px] md:w-[340px] mx-auto drop-shadow-2xl object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
              <p data-aos="zoom-out" className="font-bold text-xl">
                {BannerDataDerived?.category}
              </p>
              <p data-aos="fade-up" className="text-3xl sm:text-5xl font-bold">
                {BannerDataDerived?.season}
              </p>
              <p data-aos="fade-up" className="text-sm tracking-wide leading-5">
                {BannerDataDerived?.description}
              </p>
              <div data-aos="fade-up" data-aos-offset="0">
                <Button
                  bgColor="bg-white"
                  textColor={"text-[" + BannerDataDerived?.bgColor + "]" || ""}
                  text="Shop Now"
                  title={BannerDataDerived?.title || ""}
                  handler={() =>
                    navigate(`/product/${BannerDataDerived?.id}`)
                  }
                />
              </div>
            </div>
          </div>

          <div></div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl min-h-[110%] bg-gradient-to-r from-[#BFD7EA]/80 to-white/100">
          <div className="m-10 text-center font-bold text-[#0B3954]">
            Please create a category named {categoryName} and add at least one
            product in it in order to see a working bannner here.
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
