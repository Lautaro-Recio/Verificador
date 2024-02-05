import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
// Import Swiper styles
import 'swiper/css';

import { Product } from '../../Types';

interface Offers {
  OffersFile?: Product[] | null;
}


const Slider: React.FC<Offers> = (OffersFile) => {


    return (
        <div className='font-bold bg-transparent'>
              <h4 className='py-2 text-orangeMedit bg-grayMedit rounded-md my-2 z-10 mx-96'>Ofertas Semanales</h4>
              <Swiper
                // install Swiper modules
                className='px-12 bg-transparent z-10 '
                spaceBetween={50}
                slidesPerView={2}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
              >
                {OffersFile.OffersFile?.map((oferta) => {

                  return (

                    <SwiperSlide className='z-10' key={oferta.cod}>
                      <div className='items-center place-items-center flex z-10 mx-10 h-48 border-orangeMedit bg-white border-2 rounded-lg'>
                        <img src={oferta.img} alt="" className='h-40 w-48' />
                        <div className='grid text-left gap-2 p-4 text-xl text-orangeMedit '>
                          <p>{oferta.name} </p>
                          <p>{oferta.brand} {oferta.presentation}</p>
                          <p className='text-2xl'>${oferta.price}</p>
                          <p>Disponible hasta 30/12/2023</p>
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
