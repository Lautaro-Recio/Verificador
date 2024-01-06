import { ChangeEvent } from "react";
import { uploadData } from "../../../Firebase";
import { Product } from "../../Types";
import * as XLSX from 'xlsx';

interface props {
    cod: string,
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void,
    excelFile: File | null
    where: string
}



const Update: React.FC<props> = ({ handleFileChange, cod, excelFile, where }) => {

    const convertirExcelAJson = async () => {
        if (excelFile) {
            const lector = new FileReader();

            lector.onload = (e: ProgressEvent<FileReader>) => {
                const data = e.target?.result;
                if (data) {
                    const book = XLSX.read(data as string, { type: 'binary' });
                    const jsonData: unknown[] = XLSX.utils.sheet_to_json(
                        book.Sheets[book.SheetNames[0]]
                    );

                    const products: Product[] = Array.isArray(jsonData)
                        ? jsonData.map((item: unknown) => {
                            const safeItem = item as {
                                name?: string;
                                brand?: string;
                                cod?: string;
                                price?: number;
                                presentation?: string
                            };

                            if (typeof safeItem === 'object' && safeItem !== null) {
                                const producto: Product = {
                                    cod: safeItem.cod || "",
                                    name: safeItem.name || '',
                                    brand: safeItem.brand || '',
                                    presentation: safeItem.presentation || '',
                                    price: safeItem.price || 0,
                                };
                                return producto;
                            }
                            return null;
                        })
                            .filter((producto: Product | null): producto is Product => producto !== null)
                        : [];
                    uploadData(products, where);
                }
            };

            lector.readAsBinaryString(excelFile);
        } else {
            console.error('Selecciona un archivo Excel primero.');
        }
    };


    return (
        <div className={`overflow-hidden ${cod !== "10" ? "w-0" : "w-32 p-4"} grid place-items-center  absolute z-50 w-screen h-screen  transition-all border-r-2`}>
            <div className="grid gap-6">
                <input type="file" onChange={handleFileChange} className='w-64 file:border-solid file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:font-bold file:border-orange-500 file:text-sm  file:bg-white file:text-orange-500 hover:file:bg-orange-500 hover:file:text-white' />
                <button className="border-2 p-2 rounded-lg text-orange-500 border-orange-500 text-xl bg-white font-bold hover:bg-orange-500 hover:text-white transition-all" onClick={convertirExcelAJson}>{where ==="products" ? "Actualizar precios" : "Suir Ofertas"}</button>
            </div>
        </div>
    );
};

export default Update;
