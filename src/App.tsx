import { useState, ChangeEvent, useRef, useEffect} from 'react';
import logo from "./assets/imgs/logo.png"
import NavBar from './components/NavBar/NavBar';
import Checker from './components/checker/Checker';
import Update from './components/Update/Update';
import { getOffers } from '../Firebase';
import { ProducttoMap } from './Types';

interface Props {
  deshabilitarMouseDown: (event: MouseEvent) => void
}


const App: React.FC<Props> = ({ deshabilitarMouseDown }) => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [offers, setOffersFile] = useState<ProducttoMap[] | undefined>(undefined); // Corregido aquí


  const [cod, setCod] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const [section, setSection] = useState<number>(0);
  const [navBar, setNavBar] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);



  // Llamar a la función para iniciar la escucha de cambios

  const handleClick = () => {
    if (clickHabilitado) {
      // Lógica del clic cuando está habilitado
      alert('¡Clic habilitado!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      inputRef.current?.focus();
      const offersData: ProducttoMap | undefined = await getOffers();
      if (offersData !== undefined) {
        console.log(offersData);
        setOffersFile([offersData]); // Aquí se debe pasar un array con el objeto
      } else {

        setOffersFile(undefined); // En caso de que no haya datos, se pasa undefined
      }
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
  };


  const [clickHabilitado, setClickHabilitado] = useState(true);





  return (
    <>
      <div className='h-screen overflow-hidden sticky uppercase '>

        {section === 0 && (<span className='h-screen  w-screen absolute z-30' onClick={inputFocus}></span>)}


        <NavBar setNavBar={setNavBar} deshabilitarMouseDown={deshabilitarMouseDown} navBar={navBar} setSection={setSection} />

        <div className='border-b-2 grid  place-items-center '>
          <img className='w-auto h-14' src={logo} alt="La mediterranea" />
        </div>
        <div className="h-screen flex bg-productsPng sticky">
          {section === 0 ? (
            <>
              <Checker
                offers={offers}
                inputFocus={inputFocus}
                setNavBar={setNavBar}
                myInput={inputRef}
                cod={cod}
                setCod={setCod}
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
