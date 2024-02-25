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
    setProductMap: React.Dispatch<React.SetStateAction<ProducttoMap | undefined> | null>;
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
    ProductsFile?: Product[] | null;
    OffersFile?: Product[] | null;
    setNavBar: React.Dispatch<React.SetStateAction<boolean>>;
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

    const handleChange = (num: string) => {
        console.log(num);
        setCod(num);
        setTimeout(() => {
            myInput.current?.blur();
            // Hacer que el input recupere el focus
        }, 100);
        setTimeout(() => {
            setProductMap(null);
            setNotFound(false);
            setCod("");
            myInput.current?.focus(); // Hacer que el input recupere el focus
        }, 3000);
    };

    const filtrarProducto = (num: string) => {
        num === "6935364070854" && setNavBar(true);

        // Hacer que el input pierda el focus
        if(num === ""){

            setTimeout(() => {
                setProductMap(null);
                setNotFound(false);
                setCod("");
                myInput.current?.focus(); // Hacer que el input recupere el focus
            }, 3000);
        }
        try {
            const prod = ProductsFile?.find((e) => e.cod === num);
            prod ? setProductMap(prod) : setNotFound(true);
        } catch (error) {
            console.error('Error al analizar JSON:', error);
        }

        // Restablecer los estados después de un tiempo
       
    };

    return (
        <div className="h-1/2 place-items-center w-full text-3xl text-center uppercase">
            <div className="h-[90%]">
                <input
                    type="number"
                    ref={myInput}
                    className="opacity-0 w-0 h-0 pointer-events-none"
                    value={cod}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={(e) => filtrarProducto(e.target.value)}
                />
                <div>
                    {productMap ? (
                        <FindedProduct productMap={productMap} />
                    ) : (
                        <b>
                            <h1 className="md:text-3xl text-xl uppercase text-orangeMedit  bg-grayMedit md:mx-72 mx-36 p-2 rounded-lg">
                                Consulte su precio aquí
                            </h1>
                        </b>
                    )}
                    {notFound && <UnfindedProduct cod={cod} />}
                </div>
            </div>
            <Slider OffersFile={OffersFile} />
        </div>
    );
};

export default Checker;
