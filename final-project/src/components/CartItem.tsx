import { Product } from "@/types/product.types";
import Image from "next/image";
import Link from "next/link";
import { BiHeart } from "react-icons/bi";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

type CartItemProps = {
  product: Product;
  quantity: number;
  total: number;
  discount: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  removeItem: () => void;
};

const CartItem = ({
  total,
  discount,
  product,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}: CartItemProps) => {
  return (
    <div className="flex justify-between text-neutral-500 dark:text-neutral-400 border-t border-t-neutral-300 dark:border-t-neutral-800 py-4">
      <div className="flex gap-3">
        <Image
          src={product.mainImage}
          alt={product.productName}
          className="rounded bg-neutral-200 w-auto h-auto object-contain"
          width={110}
          height={110}
        />
        <div className="text-sm flex flex-col gap-1 tracking-tight">
          <Link href={`/products/${product.id}`} className="text-base text-neutral-800 dark:text-white font-semibold">
            {product.productName}
          </Link>
          <p className="flex gap-1">
            <span className="text-green-600 font-semibold">${discount}</span>
            <span className="line-through decoration-2 text-xs text-neutral-400 font-semibold">${product.price}</span>
          </p>
          <p>{product.category.categoryName}</p>
          <span className="w-20 text-center rounded-lg text-xs bg-yellow-100/70 dark:bg-transparent dark:border px-2 py-1 text-yellow-500 dark:text-yellow-400 font-semibold inline-block">
            Disc: {product.discountPercentage}%
          </span>
          <div className="text-sm flex items-center gap-2 pt-1">
            <BiHeart className="cursor-pointer hover:text-green-500" />
            <RiDeleteBinLine
              className="cursor-pointer hover:text-red-500"
              onClick={removeItem}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-neutral-800 dark:text-white tracking-tight font-semibold">
          ${total.toFixed(2)}
        </p>
        <div className="flex items-center justify-center text-sm text-neutral-900 dark:text-white gap-2 font-semibold">
          <IoIosRemoveCircleOutline
            onClick={decreaseQuantity}
            className="cursor-pointer"
          />
          <span>{quantity}</span>
          <IoIosAddCircleOutline
            onClick={increaseQuantity}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
