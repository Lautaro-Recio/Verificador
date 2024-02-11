import { ProducttoMap } from "../../Types";

interface props {
    productMap: ProducttoMap

}

const FindedProduct: React.FC<props> = ({productMap}) => {

    return (
        <div className='bg-[#e1e1e1b0] md:mx-72 mx-36 rounded-lg'>

            <b >
                <p className='p-4 md:text-4xl text-2xl'>{productMap?.name} </p>
                <p className="md:text-4xl text-2xl ">{productMap?.presentation} {productMap?.brand}</p>
                <p className='p-4 md:text-4xl text-2xl'>${productMap?.price.toFixed(2)}</p>
                <p className='p-4 md:text-base text-sm'> cod: {productMap?.cod}</p>
            </b>
        </div>

    );
};

export default FindedProduct;
