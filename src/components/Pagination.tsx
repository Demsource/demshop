import React from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationPropsInterface {
  page: number;
  pageSize: number;
  totalProducts: number;
}

const Pagination: React.FC<PaginationPropsInterface> = ({
  page,
  pageSize,
  totalProducts,
}) => {
  const hasPrevPage = page > 1;
  //   const hasNextPage = page < Math.ceil(totalProducts / pageSize)
  const hasNextPage = page * pageSize < totalProducts;

  const [searchParams, setSearchParams] = useSearchParams();
  const onPageChange = (page: number) => {
    searchParams.set("page", `${page}`);
    setSearchParams(searchParams);
  };

  const totalPages = Math.ceil(totalProducts / pageSize);
  const allPageNums = new Array(totalPages)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <div className="flex items-center gap-2 justify-center mt-8">
      <button
        disabled={!hasPrevPage}
        onClick={() => onPageChange(page - 1)}
        className={`px-3 py-1 rounded border text-[#087E8B] ${
          hasPrevPage
            ? "hover:bg-white cursor-pointer"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        Previous
      </button>

      {allPageNums &&
        allPageNums.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded border   ${
              page === num
                ? "bg-[#087E8B] hover:bg-[#087E8B] text-white cursor-not-allowed"
                : "text-[#087E8B] hover:bg-white cursor-pointer"
            }`}
          >
            {num}
          </button>
        ))}

      <button
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
        className={`px-3 py-1 rounded border text-[#087E8B] ${
          hasNextPage
            ? "hover:bg-white cursor-pointer"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
