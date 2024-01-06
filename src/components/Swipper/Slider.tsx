import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
// Import Swiper styles
import 'swiper/css';
import queso from "../../assets/queso.jpg"
import coca from "../../assets/coca.jpg"
import vacio from "../../assets/vacio.png"
import arroz from "../../assets/arroz.jpg"
import alfajor from "../../assets/alfajor.jpg"


const ofertas = [
  { cod: "0", prod: "Queso Cremoso", price: 1550, brand: "Tregar", presentation: "1 Kg", img: queso },
  { cod: "48948916", prod: "gaseosa", price: 1200, brand: "Coca Cola", presentation: "1.5 Lts", img: coca },
  { cod: "0", prod: "Vacio de Ternera", price: 7500, brand: "Carniceria", presentation: "1 kg", img: vacio },
  { cod: "7797978879", prod: "Arroz largo fino", price: 1750, brand: "Dos Hermanos", presentation: "1 Kg", img: arroz },
  { cod: "0", prod: "Alfajor con Dulce de Leche", price: 300, brand: "Bon o Bon", presentation: "83 grs", img: alfajor },

]

const Slider: React.FC = () => {

    return (
        <div className='font-bold bg-transparent'>
              <h4 className='py-2 text-orange-500 bg-[#e1e1e1b0] rounded-md my-2 z-10 mx-96'>Ofertas Semanales</h4>
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
                {ofertas.map((oferta) => {

                  return (

                    <SwiperSlide className='z-10' key={oferta.cod}>
                      <div className='items-center place-items-center flex z-10 h-48 border-orange-500 bg-white border-2 rounded-lg'>
                        <img src={oferta.img} alt="" className='h-40 w-48' />
                        <div className='grid text-left gap-2 p-4 text-xl text-orange-500 '>
                          <p>{oferta.prod} </p>
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
