"use client";

const ViewMoreButton = ({ id }: { id: number }) => {
  const handleClick = () => {
    window.location.href = `/products/${id}`;
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer flex justify-center items-center flex-1 py-2 bg-white text-black border border-black hover:bg-neutral-200"
    >
      View More
    </button>
  );
};

export default ViewMoreButton;
