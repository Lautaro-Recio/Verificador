import { useState } from "react";
import { Product, ProducttoMap } from "../../Types";
import FindedProduct from "../Products/FindedProduct";
import UnfindedProduct from "../Products/UnfindedProduct";
import Slider from "../Swipper/Slider";

interface CheckerProps {
    myInput: React.RefObject<HTMLInputElement>;
    cod: string;
    productMap?: ProducttoMap | null;
    notFound?: boolean;
    setCod: React.Dispatch<React.SetStateAction<string>>;
    setProductMap: React.Dispatch<React.SetStateAction<ProducttoMap | undefined> | null>; // Ajuste aquí
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
    ProductsFile?: Product[] | null;
    OffersFile?: Product[] | null;
    setNavBar: React.Dispatch<React.SetStateAction<boolean>>
    inputFocus: () => void;
}

const Checker: React.FC<CheckerProps> = ({
    myInput,
    cod,
    productMap,
    notFound,
    ProductsFile,
    OffersFile,
    setCod,
    setNotFound,
    setProductMap,
    setNavBar,
    
}) => {
    const [dis, setDis] = useState(false)
1001
    const filtrarProducto = (num: string) => {
        num == "10" && setNavBar(true)
        setDis(true)
        setCod(num);
        try {
            const prod = ProductsFile?.find((e) => e.cod === num);
            prod ? setProductMap(prod) : setNotFound(true);
        } catch (error) {
            console.error('Error al analizar JSON:', error);
        }

        setTimeout(() => {
            // Función para eliminar el producto del estado
            setProductMap(null);
            setNotFound(false);
            setCod("");
            setDis(false);
        }, 5000);
        
    };
    console.log(dis)
    

    return (
        <div className="h-1/2 place-items-center w-full text-3xl text-center uppercase">
            <div className="h-[90%]">
                <input
                //ARREGLAR QUE NO TOMA AL INSTANTE EL INPUT
                    disabled={dis}
                    type="number"
                    ref={myInput}
                    className="opacity-0 w-0 h-0 pointer-events-none"
                    value={cod}
                    onChange={(e) => {
                        filtrarProducto(e.target.value);
                    }}
                />
                <div>
                    {productMap ? (
                        <FindedProduct productMap={productMap} />
                    ) : (
                        <b>
                            <h1 className="text-3xl font-custom uppercase text-orangeMedit  bg-grayMedit mx-72 p-2 rounded-lg">
                                Consulte su precio aqui
                            </h1>
                        </b>
                    )}
                    {notFound && <UnfindedProduct cod={cod} />}
                </div>
            </div>
            <Slider OffersFile={OffersFile}/>
        </div>
    );
};

export default Checker;
