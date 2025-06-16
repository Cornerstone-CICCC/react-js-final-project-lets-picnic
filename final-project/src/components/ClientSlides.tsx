'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';

const slides =  [
    {
        name: 'Irene String',
        img: '/home/cust-1.png',
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, illo quasi! Consequatur quas repellendus dicta omnis, nam amet voluptatem tempore aperiam cum.'
    },
    {
        name: 'Jonas Kakaroto',
        img: '/home/cust-2.png',
        text: 'Consequatur quas repellendus dicta omnis, nam amet voluptatem tempore aperiam cum. Natus eligendi similique dolore iure accusamus, magnam assumenda.'
    },
    {
        name: 'Mizuki Kikicoco',
        img: '/home/cust-3.png',
        text: 'Natus eligendi similique dolore iure accusamus, magnam assumenda.Aliquam, pariatur cumque. Reprehenderit quos deleniti sequi!'
    },
    {
        name: 'Tomoya Shalala',
        img: '/home/cust-4.png',
        text: 'Aliquam, pariatur cumque. Reprehenderit quos deleniti sequi! Magnam assumenda lorem ipsum dolor sit amet consectetur adipisicing elit'
    },
    {
        name: 'Julia Brabrabra',
        img: '/home/cust-5.png',
        text: 'Magnam assumenda lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, illo quasi! '
    },
    {
        name: 'Kenny Hehehe',
        img: '/home/cust-3.png',
        text: 'Magnam assumenda lorem ipsum dolor sit amet consectetur adipisicing elit.Aliquam, pariatur cumque. Reprehenderit quos deleniti sequi!'
    }
]


const ClientSlides = () => {
    const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div className="w-full mb-10">
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
            640:{
                slidesPerView: 2
            },
        }}
        navigation
        pagination={{ clickable: true}}
        loop={true}
        onSlideChange={(swiper) => {
            setSlideIndex(swiper.realIndex)
        }}
        className='relative'
      >
        { slides.map((slide, index) => (
            <SwiperSlide className='rounded-lg ' key={index}>
                <div className={`p-6 rounded-lg shadow-md h-80 sm:h-64 md:h-72 flex flex-col justify-center items-center text-center gap-3 overflow-hidden ${slideIndex === index ? "bg-black text-white":"bg-white text-black"}`}>
                    <img src={slide.img} alt={slide.name} className="rounded-full w-20 h-20 bg-stone-200"/>
                    <h1 className="font-semibold text-lg text-center">{slide.name}</h1>
                    <p className="text-sm max-w-xs sm:max-w-md md:max-w-lg w-full px-2">{slide.text}</p>
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
  );
};

export default ClientSlides;
