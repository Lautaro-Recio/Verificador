import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
// Import Swiper styles
import 'swiper/css';

import { ProducttoMap } from '../../Types';

interface Offers {
  offers?: ProducttoMap | undefined;
}

const Slider: React.FC<Offers> = (offers) => {
const ofertas = offers.offers?.data
console.log(ofertas)

    return (
        <div className='font-bold bg-transparent'>
              <h4 className='py-2 text-orangeMedit bg-grayMedit rounded-md my-2 text-xl md:text-3xl w-1/2 mx-[25%] z-10  '>Ofertas Destacadas</h4>
              <Swiper
                // install Swiper modules
                className='px-12 bg-transparent z-10 '
                spaceBetween={-5}
                slidesPerView={2}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
              >
                {ofertas?.map((oferta) => {

                  return (

                    <SwiperSlide className='z-10' key={oferta?.img}>
                      <div className='items-center place-items-center w flex z-10 md:mx-10 mx-2 h-48 border-orangeMedit bg-white border-2 rounded-lg'>
                        <img src={oferta?.img} alt="" className='md:h-40 md:w-48 h-28 w-32' />
                        <div className='grid text-left md:gap-2 md:p-4 md:text-xl text-base text-orangeMedit '>
                          <p>{oferta?.name} </p>
                          <p>{oferta?.brand} {oferta?.presentation}</p>
                          <p className='md:text-2xl text-xl'>$ {oferta?.price.toFixed(2)}</p>
                          <p>Disponible {oferta?.validity}</p>
                        </div>
                      </div>
                    </SwiperSlide> 
                  )
                })
                }

              </Swiper>
            </div>

    );
};

export default Slider;
