import { useState, ChangeEvent, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Product, ProducttoMap } from './Types';
import { uploadData } from '../Firebase';

const ExcelToJsonConverter: React.FC = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<Product[] | null>();
  const [productMap, setProductMap] = useState<ProducttoMap>();
  const myInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputFocus();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setExcelFile(file || null);
  };

  const inputFocus = () => {
    // Verifica si myInput.current es diferente de null o undefined antes de llamar a focus()
    myInput.current && myInput.current.focus();
  };

  const convertirExcelAJson = async () => {
    if (excelFile) {
      const lector = new FileReader();

      lector.onload = (e: ProgressEvent<FileReader>) => {
        const datos = e.target?.result;
        if (datos) {
          const libro = XLSX.read(datos as string, { type: 'binary' });
          const jsonData: unknown[] = XLSX.utils.sheet_to_json(
            libro.Sheets[libro.SheetNames[0]]
          );

          const productos: Product[] = Array.isArray(jsonData)
            ? jsonData
                .map((item: unknown) => {
                  const itemSeguro = item as {
                    name?: string;
                    brand?: string;
                    cod?: string;
                    price?: number;
                    presentation?: string
                  };

                  if (typeof itemSeguro === 'object' && itemSeguro !== null) {
                    const producto: Product = {
                      cod: itemSeguro.cod || "",
                      name: itemSeguro.name || '',
                      brand: itemSeguro.brand || '',
                      presentation: itemSeguro.presentation || '',
                      price: itemSeguro.price || 0,
                    };
                    return producto;
                  }
                  return null;
                })
                .filter((producto: Product | null): producto is Product => producto !== null)
            : [];
            console.log(jsonFile)
          uploadData(productos);
          setJsonFile(productos);
        }
      };

      lector.readAsBinaryString(excelFile);
    } else {
      console.error('Selecciona un archivo Excel primero.');
    }
  };

  const filtrarProducto = (num: string) => {
    try {
      const prod = jsonFile?.find((e) => e.cod === num);
      console.log(num)
      console.log(prod);
      setProductMap(prod);
    } catch (error) {
      console.error('Error al analizar JSON:', error);
    }
  };
  

  return (
    <div className="h-screen bg-gray-500">
      <input type="file" onChange={handleFileChange} />
      <button onClick={convertirExcelAJson}>Convertir a JSON</button>
      <input
        type="number"
        ref={myInput}
        className="border-2"
        onChange={(e) => {
          filtrarProducto(e.target.value);
        }}
      />
      <div className="grid grid-cols-1 place-items-center border-2 h-64 uppercase">
        <p>{productMap?.name} {productMap?.brand}</p>
        <p>$ {productMap?.price}</p>
        <p>{productMap?.cod}</p>
      </div>
    </div>
  );
};

export default ExcelToJsonConverter;
