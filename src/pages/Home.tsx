import type React from "react";
import Hero from "../components/landing/Hero";
import CategoryCards from "../components/landing/CategoryCards";
import Services from "../components/landing/Services";
import Banner from "../components/landing/Banner";
import { useLoaderData } from "react-router-dom";
import type { ProductInterface } from "../services/api/products";
import { useMemo } from "react";
import ProductCards from "../components/landing/ProductCards";
import Technologies from "../components/landing/Technologies.tsx";
import ScrollToTopButton from "../components/common/ScrollToTopButton.tsx";

interface BannerDataInterface {
  BannerDataOne: {
    BannerData: ProductInterface | undefined;
    categoryName: string;
  };
  BannerDataTwo: {
    BannerData: ProductInterface | undefined;
    categoryName: string;
  };
}

const Home: React.FC = () => {
  const { BannerDataOne, BannerDataTwo } =
    useLoaderData() as BannerDataInterface;

  const BannerDataOneDerived = useMemo(() => {
    if (!BannerDataOne.BannerData) return;

    return {
      id: BannerDataOne.BannerData.id,
      discount: "50% OFF",
      title: BannerDataOne.BannerData.title,
      date: "July 27 to August 27",
      image: BannerDataOne.BannerData.image,
      category: BannerDataOne.BannerData.category_name,
      season: "Summer Sale",
      description: BannerDataOne.BannerData.description,
      bgColor: "#E3655B",
    };
  }, [BannerDataOne.BannerData]);

  const BannerDataTwoDerived = useMemo(() => {
    if (!BannerDataTwo.BannerData) return;

    return {
      id: BannerDataTwo.BannerData.id,
      discount: "50% OFF",
      title: BannerDataTwo.BannerData.title,
      date: "July 27 to August 27",
      image: BannerDataTwo.BannerData.image,
      category: BannerDataTwo.BannerData.category_name,
      season: "Summer Sale",
      description: BannerDataTwo.BannerData.description,
      bgColor: "#6DA34D",
    };
  }, [BannerDataTwo.BannerData]);

  return (
    <div className="relative flex flex-col items-center">
      <Hero />
      <CategoryCards />
      <Services />
      <Banner
        BannerDataDerived={BannerDataOneDerived}
        categoryName={BannerDataOne.categoryName}
      />
      <ProductCards />
      <Banner
        BannerDataDerived={BannerDataTwoDerived}
        categoryName={BannerDataTwo.categoryName}
      />
      <Technologies />

      <ScrollToTopButton />
    </div>
  );
};

export default Home;
