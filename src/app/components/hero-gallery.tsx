/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

export function HeroGallery() {
  const swiperRef = useRef(null)

  useEffect(() => {
    // Swiper is initialized via the Swiper component, no need for manual new Swiper()
    // The modules are passed as props
  }, [])

  return (
    <section className="hero-gallery relative w-full h-[calc(100vh-4rem)] overflow-hidden" id="hero-gallery">
      <Swiper
        ref={swiperRef}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={800}
        preloadImages={false}
        updateOnImagesReady={true}
        observer={true}
        observeParents={true}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        className="mySwiper w-full h-full"
      >
        <SwiperSlide className="relative flex items-center justify-center">
          <img
            src="rolex2.png"
            alt="Luxury Watch 2"
            className="w-full h-full object-cover"
          />
          <div className="swiper-caption absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-30">
            <h1 className="swiper-caption__title text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Innovación y Precisión
            </h1>
            <p className="swiper-caption__description text-white text-lg md:text-xl mb-8 drop-shadow-md">
              Cada pieza, una obra maestra de la ingeniería suiza.
            </p>
            <a
              href="#richard-mille"
              className="button swiper-caption__button bg-brand-accent text-brand-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-brand-accent transition-colors duration-300"
            >
              Explorar Richard Mille
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative flex items-center justify-center">
          <img
            src="rolex1.png"
            alt="Luxury Watch 3"
            className="w-full h-full object-cover"
          />
          <div className="swiper-caption absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-30">
            <h1 className="swiper-caption__title text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Tu Estilo, Tu Tiempo
            </h1>
            <p className="swiper-caption__description text-white text-lg md:text-xl mb-8 drop-shadow-md">
              Encuentra el reloj perfecto que complemente tu personalidad.
            </p>
            <a
              href="#products"
              className="button swiper-caption__button bg-brand-accent text-brand-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-brand-accent transition-colors duration-300"
            >
              Ver Todos los Productos
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative flex items-center justify-center">
          <img
            src="richard1.png"
            alt="Luxury Watch 1"
            className="w-full h-full object-cover"
          />
          <div className="swiper-caption absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-30">
            <h1 className="swiper-caption__title text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Elegancia que Define
            </h1>
            <p className="swiper-caption__description text-white text-lg md:text-xl mb-8 drop-shadow-md">
              Descubre nuestra exclusiva colección de relojes de lujo.
            </p>
            <a
              href="#rolex"
              className="button swiper-caption__button bg-brand-accent text-brand-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-brand-accent transition-colors duration-300"
            >
              Explorar Rolex
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="swiper-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex justify-center gap-2"></div>
      <div className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 z-10 text-white text-3xl cursor-pointer bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-colors duration-300"></div>
      <div className="swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 z-10 text-white text-3xl cursor-pointer bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-colors duration-300"></div>
    </section>
  )
}
