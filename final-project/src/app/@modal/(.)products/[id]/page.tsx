import BackButton from "@/components/BackButton"
import ViewMoreButton from "@/components/ViewMoreButton"
import Image from "next/image"
import Link from "next/link"

type Props = {
  params: Promise<{id: string}>
}

interface Image {
  id: number
  image: string
}

interface Product {
  id: number
  productName: string
  price: number
  mainImage: string
  secondaryImages: Image[]
  description: string
  rating: number
}

const page = async({params}: Props) => {
  const {id} = await params
  const res = await fetch(`http://localhost:5173/api/products/${id}`)
  const data: Product = await res.json()

  return (
    <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 p-6 w-full max-w-md shadow-lg relative">
        <BackButton />
        <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-400 rounded overflow-hidden mb-4">
          <Image
            src={`${data.mainImage}`}
            alt="Product Image"
            className="object-contain w-full h-full"
            height={100}
            width={100}
          />
        </div>
        <h2 className="text-xl font-semibold mb-1">{data.productName}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {data.description}
        </p>
        <p className="text-lg font-bold mb-4">${data.price}</p>
        <div className="flex gap-3">
          <button className="cursor-pointer flex-1 py-2 bg-black text-white hover:bg-neutral-800 transition">
            Add to Cart
          </button>
          <ViewMoreButton id={data.id} />
        </div>
      </div>
    </div>
  );
};

export default page;
