import { ProducttoMap } from "../../Types";

interface props {
    productMap: ProducttoMap

}

const FindedProduct: React.FC<props> = ({productMap}) => {

    return (
        <div className='bg-[#e1e1e1b0] mx-72 rounded-lg'>

            <b >
                <p className='p-4'>{productMap?.name} </p>
                <p>{productMap?.presentation} {productMap?.brand}</p>
                <p className='p-4 text-4xl'>${productMap?.price.toFixed(2)}</p>
                <p className='p-4 text-base'>{productMap?.cod}</p>
            </b>
        </div>

    );
};

export default FindedProduct;
