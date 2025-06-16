"use client";

import Mediasearch from "@/components/Mediasearch"
import { motion } from "framer-motion";
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import {Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

const brands = [
  { name: 'ZARA', logo: '/img_aboutpage/ana.png' },
  { name: 'Uniqlo', logo: '/img_aboutpage/charlott.png' },
  { name: 'Rolex', logo: '/img_aboutpage/inglot.png' },
  { name: 'Casio', logo: '/img_aboutpage/kry.png' },
  { name: 'Uniqlo', logo: '/img_aboutpage/lancome.png' },
  { name: 'Uniqlo', logo: '/img_aboutpage/laura.png' },
  { name: 'Uniqlo', logo: '/img_aboutpage/mac.png' },
  { name: 'Uniqlo', logo: '/img_aboutpage/tarte.png' },
];

const members = [
  { name: "Julia", role: "Snack Hunter", img: "/faces/julia.png" },
  { name: "Kenny", role: "Visual Dominion", img: "/faces/kenny.png" },
  { name: "Mizuki", role: "Mission Accomplisher", img: "/faces/mizuki.png" },
  { name: "Alana", role: "Unexpected Action", img: "/faces/alana.png" },
  { name: "Tomoya", role: "Silent Force", img: "/faces/tomoya.png" },
];

const page = () => {
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div className="relative top-24 flex flex-col justify-center items-center">
      <section className="flex flex-col md:flex-row justify-center items-center w-full md:w-10/12 py-16 gap-6">
        <div className="flex-1 flex flex-col gap-3 w-full">
          <h1 className="text-4xl font-semibold text-center md:text-left">Fuel Your Fabuluxe</h1>
          <h1 className="text-3xl font-semibold text-center md:text-left">Where fashion meets authenticity</h1>
          <p className="text-center md:text-left px-4 md:px-0">Founded with a passion for individuality and self-expression, MANGO is here to make fashion simple, fun, and accessible. Whether you're dressing up for a big night out or curating your everyday essentials, we’ve got you covered.</p>
          <button className="bg-stone-800 hover:bg-gray-600 px-4 py-2 text-xs font-semibold w-fit transition cursor-pointer mx-auto md:mx-0">Get Started</button>
        </div>
        <div className="relative flex-1 flex justify-center items-center">
          <img className="relative md:left-6 w-3/4 ,d:w-full rounded-2xl" src="https://www.liveabout.com/thmb/YEaeCc5sLIe6KRQjKfodkTI84Yo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-487149250-58c71e5b3df78c353c0577eb.jpg" alt="" />
        </div>
      </section>

      <section className="relative py-10 bg-neutral-400/70 w-full">
        <div className="relative grid grid-rows-2 grid-flow-col gap-8 items-center justify-center">
          {[...brands, ...brands].map((brand, index) => (
            <motion.div key={index} className="flex justify-center items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <img src={brand.logo} alt={brand.name} className="w-24 " />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="flex justify-center items-center">
        <p className="w-8/12 h-full text-2xl font-bold text-center py-15">Experience the epitome of style and elegance with our curated collection of fashion and beauty essentials. From sophisticated apparel to luxurious skincare and cosmetics, our boutique offers everything you desire to elevate your wardrobe and enhance your natural allure.</p>
      </section>

      <section className="w-full py-20"><Mediasearch /></section>

      <section className="w-full pb-40 px-24">
        <h1 className="text-4xl font-semibold text-center mb-12">
          The Faces of <span className="text-gray-400">Innovation</span>
        </h1>

        <div className="w-full pb-10">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            spaceBetween={10}
            slidesPerView={3}
            centeredSlides={true}
            navigation
            pagination={{ clickable: true}}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onSlideChange={(swiper) => {
              setSlideIndex(swiper.realIndex)
            }}
            className='relative'
            
          >
            { members.map((slide, index) => (
              <SwiperSlide className='rounded-lg' key={index}>
                <div className={`p-2 rounded-lg shadow-md h-80 sm:h-64 md:h-80 flex flex-col justify-center items-center text-center overflow-hidden ${slideIndex === index ? "bg-stone-400 text-black":"bg-stone-700/80 text-black"}`}>
                  <img src={slide.img} alt={slide.name} className=" h-60"/>
                  <h1 className="font-semibold text-2xl text-center pt-1">{slide.name}</h1>
                  <p className="text-gray-800 text-sm max-w-xs sm:max-w-md md:max-w-lg w-full px-1 font-semibold">{slide.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .swiper-pagination {
              position: relative;
              margin-top: 1.5rem;
              display: flex;
              justify-content: center;
              gap: 0.5rem;
            }
            .swiper-pagination-bullet {
              width: 4px;
              height: 4px;
              background: #a8a29e;
              opacity: 1;
              border-radius: 9999px;
              transition: background 0.3s;
            }
            .swiper-pagination-bullet-active {
              background: #fff;
            }
          `}</style>
        </div>
      </section>
    </div>
  )
}

export default page