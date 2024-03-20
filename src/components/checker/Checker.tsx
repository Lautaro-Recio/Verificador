import { useState } from "react";
import { getProd } from "../../../Firebase";
import { Product, ProducttoMap } from "../../Types";
import FindedProduct from "../Products/FindedProduct";
import UnfindedProduct from "../Products/UnfindedProduct";
import Slider from "../Swipper/Slider";

interface CheckerProps {
    offers?: ProducttoMap[] | undefined; // Ahora se espera un array de ProducttoMap
    myInput: React.RefObject<HTMLInputElement>;
    cod: string;
    notFound?: boolean;
    setCod: React.Dispatch<React.SetStateAction<string>>;
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
    OffersFile?: Product[] | null;
    setNavBar: React.Dispatch<React.SetStateAction<boolean>>;
    inputFocus: () => void;
}

const Checker: React.FC<CheckerProps> = ({
    myInput,
    cod,
    notFound,
    offers,
    setCod,
    setNotFound,
    setNavBar,
}) => {
    const [productTomap, setProductTomap] = useState<ProducttoMap | null>();

    const handleChange = async (num: string) => {
        try {
            const product: ProducttoMap | undefined = await getProd(num); // Suponiendo que getProd devuelve una Promesa<Product | undefined>
            if (product !== undefined) {
                setCod(product.data.cod);
                setProductTomap(product); // Suponiendo que product tiene una propiedad 'cod'
            } else {
                setCod(num);
                setNotFound(true);
            }
            setTimeout(() => {
                myInput.current?.blur();
                // Hacer que el input recupere el focus
            }, 100);
            setTimeout(() => {
                setProductTomap(null);
                setNotFound(false);
                setCod("");
                myInput.current?.focus(); // Hacer que el input recupere el focus
            }, 3000);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            // Manejar el error si es necesario
        }
    };

    const filtrarProducto = (num: string) => {
        num === "10" && setNavBar(true);

        // Hacer que el input pierda el focus
        if (num === "") {
            setTimeout(() => {
                setProductTomap(null);
                setNotFound(false);
                setCod("");
                myInput.current?.focus(); // Hacer que el input recupere el focus
            }, 3000);
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
                    {productTomap ? (
                        <FindedProduct productTomap={productTomap} />
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
            <Slider offers={offers} />
        </div>
    );
};

export default Checker;
