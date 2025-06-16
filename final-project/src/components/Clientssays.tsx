import { FaCircle } from "react-icons/fa";
import ClientSlides from "./ClientSlides";

const Clientssays = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-neutral-200 dark:bg-neutral-800 dark:text-white px-10 md:px-20">
            <h1 className="text-3xl md:text-5xl md:text-center py-15 md:p-15">What Our Clients Say</h1>
            <ClientSlides />
        </div>
    )
}

export default Clientssays