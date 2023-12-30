import { useState, ChangeEvent, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Product, ProducttoMap } from './Types';
import { db, uploadData } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
// import Swiper core and required modules

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
// Import Swiper styles
import 'swiper/css';
import queso from "./assets/queso.jpg"
import coca from "./assets/coca.jpg"
import vacio from "./assets/vacio.png"
import arroz from "./assets/arroz.jpg"
import alfajor from "./assets/alfajor.jpg"

const ofertas = [
  { cod: "0", prod: "Queso Cremoso", price: 1550, brand: "Tregar", presentation: "1 Kg", img: queso },
  { cod: "48948916", prod: "gaseosa", price: 1200, brand: "Coca Cola", presentation: "1.5 Lts", img: coca },
  { cod: "0", prod: "Vacio de Ternera", price: 7500, brand: "Carniceria", presentation: "1 kg", img: vacio },
  { cod: "7797978879", prod: "Arroz largo fino", price: 1750, brand: "Dos Hermanos", presentation: "1 Kg", img: arroz },
  { cod: "0", prod: "Alfajor con Dulce de Leche", price: 300, brand: "Bon o Bon", presentation: "83 grs", img: alfajor },

]

const ExcelToJsonConverter: React.FC = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<Product[] | null>();
  const [cod, setCod] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);

  const [productMap, setProductMap] = useState<ProducttoMap>();
  const myInput = useRef<HTMLInputElement>(null);

  const getData = async () => {
    try {
      const dbCollection = await getDocs(collection(db, 'la mediterranea'));

      dbCollection.forEach((doc) => {
        // Obtener datos del documento utilizando el método data()
        const productData = doc.data();
        setJsonFile(productData.data);
      });

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  // VER COMO TRAER LOS DATOS


  useEffect(() => {
    getData()
    inputFocus();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setExcelFile(file || null);
  };

  const inputFocus = () => {
    // Verifica si myInput.current es diferente de null o undefined antes de llamar a focus()
    myInput.current && myInput.current.focus();
  };

  const convertirExcelAJson = async () => {
    if (excelFile) {
      const lector = new FileReader();

      lector.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result;
        if (data) {
          const book = XLSX.read(data as string, { type: 'binary' });
          const jsonData: unknown[] = XLSX.utils.sheet_to_json(
            book.Sheets[book.SheetNames[0]]
          );

          const products: Product[] = Array.isArray(jsonData)
            ? jsonData.map((item: unknown) => {
              const safeItem = item as {
                name?: string;
                brand?: string;
                cod?: string;
                price?: number;
                presentation?: string
              };

              if (typeof safeItem === 'object' && safeItem !== null) {
                const producto: Product = {
                  cod: safeItem.cod || "",
                  name: safeItem.name || '',
                  brand: safeItem.brand || '',
                  presentation: safeItem.presentation || '',
                  price: safeItem.price || 0,
                };
                return producto;
              }
              return null;
            })
              .filter((producto: Product | null): producto is Product => producto !== null)
            : [];
          uploadData(products);
        }
      };

      lector.readAsBinaryString(excelFile);
    } else {
      console.error('Selecciona un archivo Excel primero.');
    }
  };



  const filtrarProducto = (num: string) => {

    setCod(num)
    try {
      const prod = jsonFile?.find((e) => e.cod === num);
      prod ?
        setProductMap(prod)
        :
        setNotFound(true);
    } catch (error) {
      console.error('Error al analizar JSON:', error);
    }

    setTimeout(() => {
      //funcion para que borre el producto del state
      const prod = jsonFile?.find((e) => e.cod === "num");
      setProductMap(prod);
      setNotFound(false)

      setCod("")
    }, 5000);
  };


  return (
    <>
      <span className='h-screen w-screen absolute z-50' onClick={()=>inputFocus()}></span>
      <div className=' h-screen overflow-hidden  '>
        <div className='border-b-2 text-center text-4xl font-bold uppercase '>
          <h1 className='p-2 text-orange-500'>La mediterranea</h1>
        </div>
        <div className="h-screen flex bg-productsPng">

          <div className={`overflow-hidden ${cod !== "10" ? "w-0" : "w-32 p-4"} absolute bg-white z-20 transition-all border-r-2 h-full`}>
            <input type="file" onChange={handleFileChange} className='w-auto' />
            <button onClick={convertirExcelAJson}>Actualizar precios</button>
          </div>

          <div className="col-span-5 h-1/2 place-items-center w-full text-3xl text-center  uppercase">
            <div className='h-[90%]'>

              <input
                type="number"
                ref={myInput}
                className="border-2 h-1 opacity-0"
                value={cod}
                onChange={(e) => {
                  filtrarProducto(e.target.value);
                }}
              />
              <div>

                {productMap ? (
                  <div className='bg-[#e1e1e1b0] mx-72 rounded-lg'>

                    <b >
                      <p className='p-4'>{productMap?.name} </p>
                      <p>{productMap?.presentation} {productMap?.brand}</p>
                      <p className='p-4 text-4xl'>${productMap?.price.toFixed(2)}</p>
                      <p className='p-4 text-base'>{productMap?.cod}</p>
                    </b>
                  </div>
                ) : (
                  <>
                    <b>
                      <h1 className=' text-4xl uppercase bg-[#e1e1e1b0] mx-72 p-2 rounded-lg'>Consulte su precio aqui</h1>
                    </b>
                  </>
                )}

                {notFound && (
                  <div className=' flex items-center place-content-center mt-[10%] '>
                    <p className='text-center font-bold w-1/2 p-2  bg-[#e1e1e1b0] rounded-md text-base '>
                      No pudimos encontrar el codigo "{cod}"
                    </p>
                  </div>
                )
                }
              </div>
            </div>

            <div className='font-bold bg-transparent'>
              <h4 className='py-2 text-orange-500 bg-[#e1e1e1b0] rounded-md my-2 z-10 mx-96'>Ofertas Semanales</h4>
              <Swiper
                // install Swiper modules
                className='px-12 bg-transparent z-10 '
                spaceBetween={50}
                slidesPerView={2}
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
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

          </div>
        </div>

      </div>
    </>

  );
};

export default ExcelToJsonConverter;
