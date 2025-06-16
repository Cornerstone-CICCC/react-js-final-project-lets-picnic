type Category = {
  id: number;
  categoryName: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string; 
};

type Tag = {
  id: number;
  tagName: string;
};

type SecondaryImage = {
  id: number;
  image: string;
};
export interface Product {
  id: number,
  productName: string,
  category: { id: number, categoryName: string },
  price: number,
  mainImage: string,
  description: string,
  discountPercentage: number,
  rating: number,
  sku: string,
  createdAt: string,
  updatedAt: string,
}

export type Product = {
  id: number;
  productName: string;
  category: Category;
  price: string; 
  mainImage: string;
  secondaryImages: SecondaryImage[];
  tag: Tag[];
  description: string;
  discountPercentage: number;
  rating: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
};
