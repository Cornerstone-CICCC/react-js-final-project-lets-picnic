import ProductList from "@/components/ProductList";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5173/api/categories/${id}`);
  const data = await res.json();
  const resCat = await fetch(`http://localhost:3000/category/${id}`);
  const dataCat = await resCat.json();

  return (
    <main className="px-4 lg:px-20 py-18 bg-neutral-200 dark:bg-neutral-800">
      <div className="flex flex-col gap-1 justify-between pb-1">
        <h2 className="capitalize dark:text-whitetext-3xl text-balance md:text-2xl lg:text-2xl font-bold">
          {dataCat.categoryName.replace(/-/g, " ")}{" "}
          <span className="text-neutral-500 text-xl">({data.length})</span>
        </h2>
        <p className="text-sm tracking-tight dark:text-neutral-400 text-neutral-700">{dataCat.description}</p>
      </div>

      <ProductList products={data} />
    </main>
  );
};

export default page;
