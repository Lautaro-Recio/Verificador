import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { uploadData } from '../../../Firebase';
import { Product } from '../../Types';
import * as XLSX from 'xlsx';

interface props {
  cod: string;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setExcelFile:(e:File | null) => void;
  excelFile: File | null;
  where: string;
}

const Update: React.FC<props> = ({ handleFileChange, cod, excelFile, where, setExcelFile }) => {
  const [loading, setLoading] = useState(false);

  const convertirExcelAJson = async () => {
    if (excelFile) {
      setLoading(true); // Mostrar el loader mientras se suben los datos

      const lector = new FileReader();

      lector.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result;
        if (data) {
          const book = XLSX.read(data as string, { type: 'binary' });
          const jsonData: unknown[] = XLSX.utils.sheet_to_json(book.Sheets[book.SheetNames[0]]);

          const products: Product[] = Array.isArray(jsonData)
            ? jsonData.map((item: unknown) => {
                const safeItem = item as {
                  img?: string;
                  name?: string;
                  brand?: string;
                  cod?: string;
                  price?: number;
                  presentation?: string;
                  validity?: string;
                };

                if (typeof safeItem === 'object' && safeItem !== null) {
                  const producto: Product = {
                    img: safeItem.img || '',
                    cod: safeItem.cod || '',
                    name: safeItem.name || '',
                    brand: safeItem.brand || '',
                    presentation: safeItem.presentation || '',
                    price: safeItem.price || 0,
                    validity: safeItem.validity || '',
                  };
                  return producto;
                }
                return null;
              })
              .filter((producto: Product | null): producto is Product => producto !== null)
            : [];
          uploadData(products, where)
            .then(() => {
              setLoading(false); // Ocultar el loader cuando se complete la subida
            })
            .catch((error) => {
              console.error('Error al subir datos:', error);
              setLoading(false); // Ocultar el loader en caso de error
            });
        }
      };

      lector.readAsBinaryString(excelFile);
      setExcelFile(null)
    } else {
      alert('Selecciona un archivo Excel primero.');
    }
  };

  return (
    <div className={`overflow-hidden ${cod !== '10' ? 'w-0' : 'w-32 p-4'} grid place-items-center  absolute z-50 w-screen h-screen  transition-all border-r-2`}>
      <div className="grid gap-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-64 file:border-solid file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:font-bold file:border-orangeMedit file:text-sm  file:bg-white file:text-orangeMedit hover:file:bg-orangeMedit hover:file:text-white transition-all"
        />
        <button
          className="border-2 p-2 rounded-lg text-orangeMedit border-orangeMedit text-xl bg-white font-bold hover:bg-orangeMedit hover:text-white transition-all"
          onClick={convertirExcelAJson} disabled={excelFile == null ? true : loading ? true : false }
        >
          {loading ? 'Subiendo...' : where === 'products' ? 'Actualizar precios' : 'Subir Ofertas'}
        </button>
      </div>
    </div>
  );
};

export default Update;
