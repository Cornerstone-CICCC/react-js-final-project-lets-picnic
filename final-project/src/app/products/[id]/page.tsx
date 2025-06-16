import ProductDetailClient from "@/components/ProductDetailClient";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

interface Image {
  id: number;
  image: string;
}

interface Product {
  id: number;
  productName: string;
  price: number;
  mainImage: string;
  secondaryImages: Image[];
  description: string;
  rating: number;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5173/api/products/${id}`);
  const data: Product = await res.json();
  return <ProductDetailClient data={data} />;
};

export default Page;
