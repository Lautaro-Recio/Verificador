import { useState, ChangeEvent, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Product, ProducttoMap } from './Types';
import { db, uploadData } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

const ExcelToJsonConverter: React.FC = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<Product[] | null>();
  const [cod, setCod] = useState<string>();

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
        const datos = e.target?.result;
        if (datos) {
          const libro = XLSX.read(datos as string, { type: 'binary' });
          const jsonData: unknown[] = XLSX.utils.sheet_to_json(
            libro.Sheets[libro.SheetNames[0]]
          );

          const productos: Product[] = Array.isArray(jsonData)
            ? jsonData
              .map((item: unknown) => {
                const itemSeguro = item as {
                  name?: string;
                  brand?: string;
                  cod?: string;
                  price?: number;
                  presentation?: string
                };

                if (typeof itemSeguro === 'object' && itemSeguro !== null) {
                  const producto: Product = {
                    cod: itemSeguro.cod || "",
                    name: itemSeguro.name || '',
                    brand: itemSeguro.brand || '',
                    presentation: itemSeguro.presentation || '',
                    price: itemSeguro.price || 0,
                  };
                  return producto;
                }
                return null;
              })
              .filter((producto: Product | null): producto is Product => producto !== null)
            : [];
          uploadData(productos);
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
      setProductMap(prod);
    } catch (error) {
      console.error('Error al analizar JSON:', error);
    }
  };


  return (
    <div className='bg-gray-100'>
      <div className='border-b-2 text-center text-4xl font-bold uppercase '>
        <h1 className='p-2 text-orange-500'>La mediterranea</h1>
      </div>
      <div className="h-screen flex">

        <div className={`overflow-hidden ${cod !== "10" ? "w-0" : "w-32 p-4"} transition-all border-r-2 h-full`}>
          <input type="file" onChange={handleFileChange} className='w-auto' />
          <button onClick={convertirExcelAJson}>Convertir a JSON</button>
        </div>
        <div className="col-span-5 place-items-center w-full text-5xl text-center  uppercase">
          <input
            type="number"
            ref={myInput}
            className="border-2 h-1 opacity-0"
            onChange={(e) => {
              filtrarProducto(e.target.value);
            }}
          />
          {productMap ? (
            <b>
              <p className='p-4'>{productMap?.name} </p>
              <p>{productMap?.presentation} {productMap?.brand}</p>
              <p className='p-4'>${productMap?.price}</p>
              <p className='p-4'>{productMap?.cod}</p>
            </b>
          ) : (
            <>
              <b> 
                <h1 className='p-2 text-4xl uppercase '>Consulte su precio aqui</h1>
              </b>
            </>)
          }
        </div>
      </div>
    </div>
  );
};

export default ExcelToJsonConverter;
