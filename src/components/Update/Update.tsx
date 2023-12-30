import { ChangeEvent } from "react";
import { uploadData } from "../../../Firebase";
import { Product } from "../../Types";
import * as XLSX from 'xlsx';

interface props {
    cod: string,
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void,
    excelFile: File | null
}



const Update: React.FC<props> = ({ handleFileChange, cod,excelFile }) => {

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
                    uploadData(products);
                }
            };
    
            lector.readAsBinaryString(excelFile);
        } else {
            console.error('Selecciona un archivo Excel primero.');
        }
    };


    return (
        <div className={`overflow-hidden ${cod !== "10" ? "w-0" : "w-32 p-4"}  absolute z-50 w-screen h-screen  transition-all border-r-2`}>
            <input type="file" onChange={handleFileChange} className='w-64' />
            <button onClick={convertirExcelAJson}>Actualizar precios</button>
        </div>

    );
};

export default Update;
