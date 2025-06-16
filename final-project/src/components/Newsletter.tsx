import { FaArrowRightLong } from "react-icons/fa6";

const Newsletter = () => {
    return (
        <>
            <div className=" bg-neutral-200 dark:bg-neutral-800 dark:text-white flex justify-center items-center flex-col gap-7 py-5 md:p-10">
                <h1 className="text-4xl md:text-5xl">Newsletter</h1>
                <p className="w-3/4 md:w-1/3 text-center">Be the first to hear about exclusive deals, new arrivals, and members-only discounts. No spam, just style.</p>
                <form className="border-b w-2/4 md:w-1/4 flex pb-4">
                    <input className="text-white  placeholder-gray-500 border-none outline-none w-full" type="text" placeholder="Your email address" />
                    <button><FaArrowRightLong /></button>
                </form>
            </div>
        </>
    )
}

export default Newsletter