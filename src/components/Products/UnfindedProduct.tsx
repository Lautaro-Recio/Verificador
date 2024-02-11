
interface props {
    cod: string

}

const UnfindedProduct: React.FC<props> = ({ cod }) => {

    return (
        <>
            {cod !== "6935364070854" && ( 


                <div className=' flex items-center place-content-center mt-[10%] '>
                    <p className='text-center font-bold w-1/2 p-2  bg-[#e1e1e1b0] rounded-md text-base '>
                        No pudimos encontrar el codigo "{cod}"
                    </p>
                </div>
            )
            }
        </>

    );
};

export default UnfindedProduct;
