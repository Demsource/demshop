import React from "react";
import ProductCard from "./ProductCard";
import { useLoaderData } from "react-router-dom";
import type { ProductInterface } from "../../services/api/products";

interface ProductCardsDataInterface {
  productCardsData: ProductInterface[];
}

const ProductCards: React.FC = () => {
  const { productCardsData } = useLoaderData() as ProductCardsDataInterface;

  return (
    <div className="w-full flex justify-center items-center py-6">
      {productCardsData?.length ? (
        <div className="container">
          <header className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
            <h2 className="text-3xl text-[#0B3954] font-bold lg:text-4xl">
              Our Products
            </h2>
            <p className="text-xs sm:text-sm lg:text-lg text-[#087E8B]">
              Explore Our Products
            </p>
          </header>

          <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-start">
              {productCardsData.map((productCard, i) => (
                <ProductCard
                  key={productCard.id}
                  aosDelay={i * 200}
                  productCard={productCard}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl min-h-[110%] bg-gradient-to-r from-[#BFD7EA]/80 to-white/100">
          <div className="m-10 text-center font-bold text-[#0B3954]">
            Please add at least 8 products under any category in order to see a
            working Product Card here.
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCards;
