import type { LoaderFunction } from "react-router-dom";
import { tryGettingCategories } from "../api/category";
import { tryGettingProducts, tryGettingSingleProduct } from "../api/products";

export const productsLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const filters = {
    page: params.get("page") || "1",
    pageSize: Number(params.get("pageSize")) || 10,
    minPrice: params.get("minPrice") || undefined,
    maxPrice: params.get("maxPrice") || undefined,
    onlySales: params.get("onlySales") || undefined,
    search: params.get("search") || undefined,
    categoryName: params.get("categoryName") || undefined,
  };

  const data = await tryGettingProducts(filters);
  return data;
};

export const singleProductLoader: LoaderFunction = async ({ params }) => {
  const productId = params.id || "";

  const data = await tryGettingSingleProduct(productId);

  if (!data) {
    throw new Response("Product not found", { status: 404 });
  }

  // Related Products filters
  const filtersForRelatedProducts = {
    categoryName: data.category_name,
    pageSize: 4,
  };
  // End of Related Products filters

  // Related Products Data
  const relatedProductsData = await tryGettingProducts(
    filtersForRelatedProducts
  );
  // End of Related Products Data

  return {
    singleProduct: data,
    relatedProductsData: relatedProductsData.products,
  };
};

export const homeLoader = async () => {
  // Hero filters
  const filtersForLaptops = {
    categoryName: "Laptops",
    pageSize: 1,
  };
  const filtersForBCIs = {
    categoryName: "BCIs",
    pageSize: 1,
  };
  const filtersForTVs = {
    categoryName: "TVs",
    pageSize: 1,
  };
  // End of Hero filters
  // Hero data
  const LaptopsData = await tryGettingProducts(filtersForLaptops);
  const BCIsData = await tryGettingProducts(filtersForBCIs);
  const TVsData = await tryGettingProducts(filtersForTVs);

  let heroData = [];
  LaptopsData?.products?.length && heroData.push(LaptopsData.products[0]);
  BCIsData?.products?.length && heroData.push(BCIsData.products[0]);
  TVsData?.products?.length && heroData.push(TVsData.products[0]);
  // End of Hero data

  // Category Cards Data
  const categoriesData = await tryGettingCategories();
  // End of Category Cards Data

  // Sunglasses filters
  const filtersForSunglasses = {
    categoryName: "Sunglasses",
    pageSize: 1,
  };
  // End of Sunglasses filters
  // Sunglasses data
  const sunglassesData = await tryGettingProducts(filtersForSunglasses);

  const BannerDataOne = sunglassesData?.products?.length
    ? sunglassesData.products[0]
    : undefined;
  // End of Sunglasses data

  // Sunglasses filters
  const filtersForSmartwatches = {
    categoryName: "Smartwatches",
    pageSize: 1,
  };
  // End of Smartwatches filters
  // Smartwatches data
  const smartwatchesData = await tryGettingProducts(filtersForSmartwatches);

  const BannerDataTwo = smartwatchesData?.products?.length
    ? smartwatchesData.products[0]
    : undefined;
  // End of Smartwatches data

  // Product Cards data
  const filtersForProducts = {
    pageSize: 8,
  };
  const productCardsData = await tryGettingProducts(filtersForProducts);
  // End of Product Cards data

  return {
    heroData,
    categoriesData: categoriesData,
    BannerDataOne: { BannerData: BannerDataOne, categoryName: "Sunglasses" },
    BannerDataTwo: { BannerData: BannerDataTwo, categoryName: "Smartwatches" },
    productCardsData: productCardsData.products,
  };
};
