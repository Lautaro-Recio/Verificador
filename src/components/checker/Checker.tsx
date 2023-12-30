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
    jsonFile?: Product[] | null;
}

const Checker: React.FC<CheckerProps> = ({
    myInput,
    cod,
    productMap,
    notFound,
    jsonFile,
    setCod,
    setNotFound,
    setProductMap,
}) => {
    const filtrarProducto = (num: string) => {
        setCod(num);
        try {
            const prod = jsonFile?.find((e) => e.cod === num);
            prod ? setProductMap(prod) : setNotFound(true);
        } catch (error) {
            console.error('Error al analizar JSON:', error);
        }

        setTimeout(() => {
            // Función para eliminar el producto del estado
            setProductMap(null);
            setNotFound(false);
            setCod("");
        }, 5000);
    };

    return (
        <div className="h-1/2 place-items-center w-full text-3xl text-center uppercase">
            <div className="h-[90%]">
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
                        <FindedProduct productMap={productMap} />
                    ) : (
                        <b>
                            <h1 className="text-4xl uppercase bg-[#e1e1e1b0] mx-72 p-2 rounded-lg">
                                Consulte su precio aquí
                            </h1>
                        </b>
                    )}
                    {notFound && <UnfindedProduct cod={cod} />}
                </div>
            </div>
            <Slider />
        </div>
    );
};

export default Checker;
