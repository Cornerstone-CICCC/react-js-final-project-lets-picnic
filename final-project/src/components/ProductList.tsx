"use client";

import { useCart } from "@/contexts/cart.context";
import { Product } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";

const ProductList = ({ products }: { products: Product[] }) => {
  const getSpanForIndex = (index: number) => {
    let currentIndex = 0;
    let row = 0;

    while (currentIndex <= index) {
      const isOddRow = row % 2 === 0;
      const span = isOddRow ? 3 : 2;
      let remainingCols = 6;

      while (remainingCols >= span) {
        if (currentIndex === index) return span;
        remainingCols -= span;
        currentIndex++;
      }
      row++;
    }

    return 2;
  };

  const { addToCart } = useCart();
  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
  };

  return (
    <div className="grid gap-1.5 grid-cols-1 md:grid-cols-6 auto-rows-auto">
      {products.map((item, index) => {
        const span = getSpanForIndex(index);
        return (
          <div
            key={item.id}
            className="bg-white dark:bg-neutral-800 rounded-lg p-4"
            style={{ gridColumn: `span ${span}` }}
          >
            <Image
              src={item.mainImage}
              alt={item.productName}
              width={300}
              height={200}
              className="w-auto h-auto rounded mb-3 w-full object-contain h-[200px] bg-neutral-200"
            />
            <div className="flex items-stretch justify-between gap-4">
              <div className="flex flex-col justify-center w-4/7 overflow-hidden">
                <Link
                  href={`/products/${item.id}`}
                  className="truncate font-semibold text-black dark:text-white text-sm"
                >
                  {item.productName}
                </Link>
                <p className="truncate text-xs text-gray-600 dark:text-gray-300 min-h-[1rem]">
                  {item.category.categoryName || "\u00A0"}
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(item.id)}
                className="w-3/7 text-nowrap px-2 font-semibold text-xs border-[1.5px] dark:border-0 border-neutral-500 bg-white dark:bg-neutral-700 text-black dark:text-white uppercase hover:bg-neutral-100 dark:hover:bg-neutral-600 transition cursor-pointer"
              >
                Buy now | ${item.price}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
