import { useState, ChangeEvent, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Product, ProducttoMap } from './Types';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

import NavBar from './components/NavBar/NavBar';
import Checker from './components/checker/Checker';
import Update from './components/Update/Update';

const App: React.FC = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<Product[] | null>(null);
  const [cod, setCod] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const [productMap, setProductMap] = useState<ProducttoMap | undefined>(undefined);
  const [section, setSection] = useState<number>(0);
  const [navBar, setNavBar] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getData = async () => {
    try {
      const dbCollection = await getDocs(collection(db, 'la mediterranea'));
      dbCollection.forEach((doc) => {
        const productData = doc.data();
        setJsonFile(productData?.data ?? null);
      });
      //falta diferenciar el archivo de productos y el archivo de ofertas
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
      inputRef.current?.focus();
    };

    fetchData();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setExcelFile(file || null);
  };

  const inputFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <div className='h-screen overflow-hidden sticky'>
        {section === 0 && (<span className='h-screen w-screen absolute z-30' onClick={inputFocus}></span>)}


        <NavBar setNavBar={setNavBar}  navBar={navBar} setSection={setSection} />

        <div className='border-b-2 text-center text-4xl font-bold uppercase'>
          <h1 className='p-2 text-orange-500'>La mediterranea</h1>
        </div>
        <div className="h-screen flex bg-productsPng sticky">
          {section === 0 ? (
            <>
              <Checker
                setNavBar={setNavBar}
                myInput={inputRef}
                cod={cod}
                productMap={productMap}
                setCod={setCod}
                jsonFile={jsonFile}
                setProductMap={setProductMap as Dispatch<SetStateAction<ProducttoMap | undefined> | null>}
                setNotFound={setNotFound}
                notFound={notFound}
              />
            </>
          ) : section === 1 ? (
            <Update cod={cod} handleFileChange={handleFileChange} excelFile={excelFile} where='products' />
          ) : (
            <Update cod={cod} handleFileChange={handleFileChange} excelFile={excelFile} where='offers' />
          )
          }
        </div>
      </div>
    </>
  );
};

export default App;
