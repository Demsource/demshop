import React from "react";
import type { ProductInterface } from "../../services/api/products";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

interface ProductCardInterface {
  productCard: ProductInterface;
  aosDelay: number;
}

const ProductCard: React.FC<ProductCardInterface> = ({
  productCard,
  aosDelay,
}) => {
  const navigate = useNavigate();

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={`${aosDelay}`}
      className="group w-full"
    >
      <div className="relative">
        <div className="flex justify-center items-center bg-[#BFD7EA] h-[250px] rounded-2xl">
          <img
            src={productCard.image}
            alt={productCard.title}
            className="w-1/2 rounded-md"
          />
        </div>
        <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full text-center group-hover:backdrop-blur-xs justify-center items-center duration-200">
          <Button
            text="Shop Now"
            title={productCard.title}
            textColor="text-white"
            bgColor="bg-[#1376f4]"
            handler={() => navigate(`/product/${productCard.id}`)}
          />
        </div>
      </div>

      <div className="leading-7">
        <h2 className="font-semibold">{productCard.title}</h2>
        <h2 className="font-bold">$ {productCard.price}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
