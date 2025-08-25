import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import type { CategoryInterface } from "./CategoryCards";

interface CategoryCardsGroupInterface {
  categoryCardsData: CategoryInterface[];
  second?: boolean;
}

const CategoryCardsGroup: React.FC<CategoryCardsGroupInterface> = ({
  categoryCardsData,
  second,
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        className={`${
          second ? "order-3" : ""
        } py-10 pl-5 overflow-hidden bg-gradient-to-br ${
          second
            ? "from-[#0B3954]/90 to-[#0B3954]/70"
            : "from-[#0B3954]/70 to-[#0B3954]/90"
        } text-white rounded-3xl relative h-[320px] flex items-end justify-center`}
      >
        <div className="z-10">
          <div className="mb-4">
            <p className="mb-[2px] text-[#BFD7EA]">Enjoy</p>
            <p className="text-2xl font-semibold mb-[2px]">With</p>
            <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
              {categoryCardsData?.[0]?.name}
            </p>
            <Button
              text="Browse"
              bgColor={`${second ? "bg-[#1376f4]" : "bg-[#E3655B]"}`}
              textColor="text-white"
              title={categoryCardsData?.[0]?.name}
              handler={() =>
                navigate(
                  `/products?categoryName=${categoryCardsData?.[0]?.name}`
                )
              }
            />
          </div>
        </div>
        <img
          src={categoryCardsData?.[0]?.image}
          alt={categoryCardsData?.[0]?.name}
          className="w-[320px] absolute top-0 z-1"
        />
      </div>

      <div
        className={`${
          second ? "order-2" : ""
        } py-10 pl-5 overflow-hidden bg-gradient-to-br ${
          second
            ? "from-[#1376f4]/90 to-[#1376f4]/70"
            : "from-[#E3655B]/90 to-[#E3655B]/70"
        } text-white rounded-3xl relative h-[320px] flex items-end justify-center`}
      >
        <div className="z-10">
          <div className="mb-4">
            <p className="mb-[2px] text-[#BFD7EA]">Enjoy</p>
            <p className="text-2xl font-semibold mb-[2px]">With</p>
            <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
              {categoryCardsData?.[1]?.name}
            </p>
            <Button
              text="Browse"
              bgColor="bg-white"
              textColor={`${second ? "text-[#1376f4]" : "text-[#E3655B]"}`}
              title={categoryCardsData?.[1]?.name}
              handler={() =>
                navigate(
                  `/products?categoryName=${categoryCardsData?.[1]?.name}`
                )
              }
            />
          </div>
        </div>
        <img
          src={categoryCardsData?.[1]?.image}
          alt={categoryCardsData?.[1]?.name}
          className="w-[320px] absolute top-0 z-1"
        />
      </div>

      <div
        className={`${
          second ? "order-1" : ""
        } col-span-2 py-10 pl-5 overflow-hidden bg-gradient-to-br ${
          second
            ? "from-[#6DA34D]/90 to-[#6DA34D]/70"
            : "from-[#087E8B]/90 to-[#087E8B]/70"
        } text-white rounded-3xl relative h-[320px] flex items-end justify-center`}
      >
        <div className="z-10">
          <div className="mb-4">
            <p className="mb-[2px] text-[#BFD7EA]">Enjoy</p>
            <p className="text-2xl font-semibold mb-[2px]">With</p>
            <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
              {categoryCardsData?.[2]?.name}
            </p>
            <Button
              text="Browse"
              bgColor="bg-white"
              textColor={`${second ? "text-[#6DA34D]" : "text-[#087E8B]"}`}
              title={categoryCardsData?.[2]?.name}
              handler={() =>
                navigate(
                  `/products?categoryName=${categoryCardsData?.[2]?.name}`
                )
              }
            />
          </div>
        </div>
        <img
          src={categoryCardsData?.[2]?.image}
          alt={categoryCardsData?.[2]?.name}
          className="w-[320px] z-1"
        />
      </div>
    </div>
  );
};

export default CategoryCardsGroup;
