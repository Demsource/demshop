import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import { tryGettingCategoryNames } from "../services/api/category";

const FilterPanel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: string[] = await tryGettingCategoryNames();
        setCategories(response);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === "checkbox") {
      if (target.checked) {
        searchParams.set(name, "true");
      } else {
        searchParams.delete(name);
      }
    } else if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    setSearchParams(searchParams);
  };

  const handleReset = () => {
    searchParams.delete("search");
    searchParams.delete("categoryName");
    searchParams.delete("minPrice");
    searchParams.delete("maxPrice");
    searchParams.delete("onlySales");

    setSearchParams(searchParams);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0B3954] flex items-center">
          Filter
        </h3>
        <button
          className="bg-[#087E8B] hover:bg-[#0B3954] rounded-md text-white px-4 py-1 cursor-pointer"
          onClick={handleReset}
        >
          Clear
        </button>
      </div>

      <form className="space-y-4">
        <div className="relative group">
          <input
            type="text"
            className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-lg pr-9"
            placeholder="Search a product"
            name="search"
            value={searchParams.get("search") || ""}
            onChange={handleInputChange}
          />
          <CiSearch className="text-xl text-[#0B3954] group-hover:text-[#087E8B] absolute top-1/2 -translate-y-1/2 right-3 duration-300" />
        </div>

        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-[#0B3954] mb-1"
          >
            Category
          </label>
          <select
            name="categoryName"
            id="categoryName"
            className="block w-full rounded-lg border border-[#BFD7EA] px-3 py-2.5 text-[#0B3954] focus:border-[#087E8B] focus:outline-none focus:ring-1 focus-ring-[#0B3954]"
            value={searchParams.get("categoryName") || ""}
            onChange={handleInputChange}
          >
            <option value="">All Category</option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium text-[#0B3954] mb-1"
              >
                Minimum Price
              </label>
              <input
                type="number"
                className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-lg"
                name="minPrice"
                id="minPrice"
                placeholder="Min price"
                value={searchParams.get("minPrice") || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium text-[#0B3954] mb-1"
              >
                Maximum Price
              </label>
              <input
                type="number"
                className="w-full border border-[#0B3954] px-3 py-1 focus:outline-none rounded-lg"
                name="maxPrice"
                id="maxPrice"
                placeholder="Max price"
                value={searchParams.get("maxPrice") || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-[#1376f4] focus:ring-[#1376f4] border-[#BFD7EA] rounded"
            id="onlySales"
            name="onlySales"
            checked={searchParams.get("onlySales") === "true"}
            onChange={handleInputChange}
          />
          <label
            htmlFor="onlySales"
            className="ml-2 text-sm text-[#0B3954] rounded"
          >
            Sale
          </label>
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;
