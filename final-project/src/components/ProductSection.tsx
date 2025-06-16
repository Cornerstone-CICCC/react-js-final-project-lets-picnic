"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Link from "next/link";

const categories = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "tops",
  "womens-bags",
  "womens-dresses",
  "womens-shoes",
];

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("mens-shirts");
  const [products, setProducts] = useState([])

  const getProducts = async () => {
      const res = await fetch(`http://localhost:5173/api/categories/1`);
      const data = await res.json();
      setProducts(data);
    };
  
    useEffect(() => {
      getProducts();
    }, []);

  return (
    <div className="flex flex-col px-4 lg:px-20 pt-15 space-y-6 w-full">
      <h2 className="dark:text-whitetext-3xl text-balance md:text-4xl lg:text-5xl text-center font-bold pb-5">
        Our Featured Products
      </h2>
      <div className="flex flex-wrap gap-3 pb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`cursor-pointer uppercase px-4 py-2 text-xs tracking-wide font-semibold border border-black ${
              selectedCategory === cat
                ? "bg-white text-black border-white"
                : "text-black dark:text-white dark:border-white"
            } hover:bg-white hover:text-black hover:border-white transition`}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
        <Link
          href="/"
          className="cursor-pointer uppercase px-4 py-2 text-xs tracking-wide font-semibold bg-black text-white"
        >
          See All
        </Link>
      </div>
      <ProductList products={products} />
      <Link
        href="/products"
        className="cursor-pointer m-auto uppercase px-4 py-2 text-xs tracking-wide font-semibold bg-black text-white"
      >
        See All
      </Link>
    </div>
  );
};

export default ProductSection;
