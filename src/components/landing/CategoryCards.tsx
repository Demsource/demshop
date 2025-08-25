import React, { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import CategoryCardsGroup from "./CategoryCardsGroup";

export interface CategoryInterface {
  name: string;
  image: string;
}

interface CategoryCardsDataInterface {
  categoriesData: CategoryInterface[];
}

const CategoryCards: React.FC = () => {
  const { categoriesData } = useLoaderData() as CategoryCardsDataInterface;

  const categoryCardsData = useMemo(() => {
    const availableCategories = [...categoriesData];
    let selectedCategories = [];

    for (let i = 0; i < 6; i++) {
      if (availableCategories.length === 0) {
        break;
      }
      const randomIndex = Math.floor(
        Math.random() * availableCategories.length
      );
      selectedCategories.push(availableCategories.splice(randomIndex, 1)[0]);
    }

    if (selectedCategories.length + availableCategories.length < 6) {
      while (selectedCategories.length < 6) {
        if (selectedCategories.length === 0) {
          console.warn(
            "No categories were available to select from, even for duplication."
          );
          break;
        }
        const randomIndex = Math.floor(
          Math.random() * selectedCategories.length
        );
        selectedCategories.push(selectedCategories[randomIndex]);
      }
    }

    return selectedCategories;
  }, [categoriesData]);

  return (
    <div className="py-8">
      {categoriesData?.length ? (
        <div className={"container space-y-10"}>
          <CategoryCardsGroup
            categoryCardsData={categoryCardsData.slice(0, 3)}
          />
          <CategoryCardsGroup
            categoryCardsData={categoryCardsData.slice(3, 6)}
            second
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl min-h-[110%] bg-gradient-to-r from-[#BFD7EA]/80 to-white/100">
          <div className="m-10 text-center font-bold text-[#0B3954]">
            No categories were available to select from, even for duplication.
            Please create at least 6 categories in order to see a working
            Category Cards here. Note: Adding less than six category will cause
            duplication.
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCards;
