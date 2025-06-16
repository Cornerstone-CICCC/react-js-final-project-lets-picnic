import ProductList from "@/components/ProductList";

const page = async() => {
  const res = await fetch(`http://localhost:5173/api/products/`);
  const data = await res.json();
  return (
    <main className="px-4 lg:px-20 py-18 bg-neutral-200 dark:bg-neutral-800">
      <h2 className="dark:text-whitetext-3xl text-balance md:text-2xl lg:text-2xl font-bold pb-5">
        All Products <span className="text-neutral-500 text-xl">({data.length})</span>
      </h2>
      <ProductList products={data} />
    </main>
  );
};

export default page;
