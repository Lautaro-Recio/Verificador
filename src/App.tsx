import { useState, ChangeEvent, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Product, ProducttoMap } from './Types';
import { db } from '../Firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import logo from "./assets/imgs/logo.png"
import NavBar from './components/NavBar/NavBar';
import Checker from './components/checker/Checker';
import Update from './components/Update/Update';

interface Props {
  deshabilitarMouseDown: (event: MouseEvent) => void
}


const App: React.FC<Props> = ({ deshabilitarMouseDown }) => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [ProductsFile, setProductsFile] = useState<Product[] | null>(null);
  const [OffersFile, setOffersFile] = useState<Product[] | null>(null);

  const [cod, setCod] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const [productMap, setProductMap] = useState<ProducttoMap | undefined>(undefined);
  const [section, setSection] = useState<number>(0);
  const [navBar, setNavBar] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const listenToDataChanges = () => {
    try {
      const productsRef = doc(db, 'la mediterranea', 'products');
      const offersRef = doc(db, 'la mediterranea', 'offers');

      // Escuchar cambios en el documento de productos
      const unsubscribeProducts = onSnapshot(productsRef, (snapshot) => {
        const data = snapshot.data();
        setProductsFile(data?.data);
        // Puedes agregar aquí la lógica para diferenciar el archivo de productos
      });

      // Escuchar cambios en el documento de ofertas
      const unsubscribeOffers = onSnapshot(offersRef, (snapshot) => {
        const data = snapshot.data();
        setOffersFile(data?.data);
        // Puedes agregar aquí la lógica para diferenciar el archivo de ofertas
      });

      // Devolver una función de limpieza para detener la escucha cuando sea necesario
      return () => {
        unsubscribeProducts();
        unsubscribeOffers();
      };
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  // Llamar a la función para iniciar la escucha de cambios
  listenToDataChanges();

  const handleClick = () => {
    if (clickHabilitado) {
      // Lógica del clic cuando está habilitado
      alert('¡Clic habilitado!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      listenToDataChanges();
      inputRef.current?.focus();
    };

    const deshabilitarClick = () => {
      setClickHabilitado(false);
    };

    deshabilitarClick();

    fetchData();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setExcelFile(file || null);
  };

  const inputFocus = () => {
    handleClick()
    inputRef.current?.focus();
    console.log("VOLVI")
  };


  const [clickHabilitado, setClickHabilitado] = useState(true);





  return (
    <>
      <div className='h-screen overflow-hidden sticky'>

        {section === 0 && (<span className='h-screen  w-screen absolute z-30' onClick={inputFocus}></span>)}


        <NavBar setNavBar={setNavBar} deshabilitarMouseDown={deshabilitarMouseDown} navBar={navBar} setSection={setSection} />

        <div className='border-b-2 grid  place-items-center text-4xl font-bold uppercase'>
          <img className='w-auto h-14' src={logo} alt="La mediterranea" />
        </div>
        <div className="h-screen flex bg-productsPng sticky">
          {section === 0 ? (
            <>
              <Checker
                inputFocus={inputFocus}
                setNavBar={setNavBar}
                myInput={inputRef}
                cod={cod}
                productMap={productMap}
                setCod={setCod}
                ProductsFile={ProductsFile}
                OffersFile={OffersFile}
                setProductMap={setProductMap as Dispatch<SetStateAction<ProducttoMap | undefined> | null>}
                setNotFound={setNotFound}
                notFound={notFound}
              />
            </>
          ) : section === 1 ? (
            <Update inputFocus={inputFocus} setExcelFile={setExcelFile} cod={cod} handleFileChange={handleFileChange} excelFile={excelFile} where='products' />
          ) : (
            <Update inputFocus={inputFocus} setExcelFile={setExcelFile} cod={cod} handleFileChange={handleFileChange} excelFile={excelFile} where='offers' />
          )
          }
        </div>
      </div>
    </>
  );
};

export default App;
