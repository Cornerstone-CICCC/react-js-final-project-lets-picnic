"use client";

import { useCart } from "@/contexts/cart.context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL"];

interface ImageType {
  id: number;
  image: string;
}

interface Product {
  id: number;
  productName: string;
  price: number;
  mainImage: string;
  secondaryImages: ImageType[];
  description: string;
  rating: number;
}

type Props = {
  data: Product;
};

function ProductDetailClient({ data }: Props) {
  const [mainImage, setMainImage] = useState(data.mainImage);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();


  return (
    <div className="max-w-6xl mx-auto px-4 py-18 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="md:col-span-1 flex gap-4">
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
          {data.secondaryImages.map((img) => (
            <div
              key={img.id}
              className={`w-20 h-20 rounded border cursor-pointer overflow-hidden ${
                img.image === mainImage ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setMainImage(img.image)}
            >
              <Image
                src={img.image}
                alt={data.productName}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
        <div className="w-full aspect-square bg-neutral-100 rounded overflow-hidden flex-1">
          <Image
            src={mainImage}
            alt="Product"
            width={600}
            height={600}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
      <div className="md:col-span-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{data.productName}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          {data.description}
        </p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < Math.floor(data.rating) ? "⭐" : "☆"}</span>
          ))}
          <span className="text-sm text-gray-500 ml-2">{data.rating} / 5</span>
        </div>
        <p className="text-xl font-semibold">${data.price}</p>
        <div>
          <p className="mb-2 font-medium">Available Sizes</p>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded cursor-pointer select-none ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <button onClick={() => addToCart(data.id, 1)} className="cursor-pointer flex-1 py-3 bg-neutral-900 text-white font-semibold rounded hover:bg-neutral-700 transition">
            Add to Cart
          </button>
          <Link href={'/checkout'} onClick={() => addToCart(data.id, 1)} className="text-center cursor-pointer flex-1 py-3 bg-white text-black font-semibold border border-black rounded hover:bg-neutral-100 transition">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailClient;
