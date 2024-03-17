import { ProducttoMap,  } from "../../Types";

interface props {
    productTomap: ProducttoMap

}

const FindedProduct: React.FC<props> = ({productTomap}) => {
    console.log(productTomap.data)

    return (
        <div className='bg-[#e1e1e1b0] md:mx-72 mx-12 rounded-lg'>

            <b >
                <p className='p-4 md:text-4xl text-2xl'>{productTomap?.data.name} </p>
                <p className="md:text-4xl text-2xl ">{productTomap?.data.presentation} {productTomap?.data.brand}</p>
                <p className='p-4 md:text-4xl text-2xl'>${productTomap?.data.price.toFixed(2) }</p>
                <p className='p-4 md:text-base text-sm'> cod: {productTomap?.data.cod}</p>
            </b>
        </div>

    );
};

export default FindedProduct;
