import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TbBrandTwitterFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <div>
        <section className="bg-stone-200 w-full flex justify-center md:justify-between items-center p-2 md:p-2.5 md:pl-[3rem] md:pr-[3rem]">
            <h1 className="text-black text-xl font-semibold hidden sm:block">MANGO</h1>
            <ul className="flex justify-around items-center gap-16 text-sm text-gray-600">
                <li>Product</li>
                <li>Features</li>
                <li>Reviews</li>
                <li>About us</li>
            </ul>
            <ul className="hidden sm:block md:flex justify-around items-center gap-5 text-black ">
                <li><FaFacebookF/></li>
                <li><FaInstagram/></li>
                <li><TbBrandTwitterFilled/></li>
            </ul>
        </section>
        <section className="w-full flex justify-center items-center bg-black text-white p-2">
            <p className="text-sm">&copy; 2025 Let's Picnic, all rights reserved.</p>
        </section>
    </div>
  )
}

export default Footer