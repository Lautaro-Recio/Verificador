import { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import { Product } from './Types';

const ExcelToJsonConverter: React.FC = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<Product[] | null>();
  const [handleCode, setHandleCode] = useState<number>();


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setExcelFile(file || null);
  };

  const convertExcelToJson = () => {
    if (excelFile) {
      const reader = new FileReader();
  
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data as string, { type: 'binary' });
          const jsonData: unknown[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  
          // Asegurarse de que jsonData sea un array y convertirlo al tipo de producto
          const products: Product[] = Array.isArray(jsonData)
            ? jsonData
                .map((item: unknown) => {
                  // Realizar el tipo de aseguramiento
                  const safeItem = item as { name?: string; brand?: string; cod?: number; price?: number };
  
                  if (typeof safeItem === 'object' && safeItem !== null) {
                    // Asegurar que el objeto cumple con la interfaz 'Product'
                    const product: Product = {
                      cod: safeItem.cod || 0,      
                      name: safeItem.name || "",  
                      brand: safeItem.brand || "", 
                      price: safeItem.price || 0,  
                      
                    };
                    return product;
                  }
                  // Si no es un objeto, puedes manejarlo de acuerdo a tus necesidades
                  return null;
                })
                .filter((product: Product | null): product is Product => product !== null) // Filtrar elementos nulos
            : [];
  
          // Ahora puedes usar 'products' para manejar los datos según tus necesidades
          setJsonFile(products);
        }
      };
  
      reader.readAsBinaryString(excelFile);
    } else {
      console.error("Selecciona un archivo Excel primero.");
    }
  };
  
  
  
  console.log(jsonFile)

  console.log(handleCode)

  
  

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={convertExcelToJson}>Convertir a JSON</button>
      <input type="number" className='border-2' onChange={(e)=>{setHandleCode(e.target.value)}} />
      {jsonFile?.map(item =>(
        <div className='grid grid-cols-1 place-items-center uppercase' key={item.cod}>
          <p>{item.name} {item.brand}</p>
          <p>$ {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ExcelToJsonConverter;
