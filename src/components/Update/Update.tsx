import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { uploadData } from '../../../Firebase';
import { Product } from '../../Types';
import * as XLSX from 'xlsx';

interface Props {
  cod: string;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setExcelFile: (e: File | null) => void;
  excelFile: File | null;
  where: string;
  inputFocus: () => void;
}

const Update: React.FC<Props> = ({ handleFileChange, cod, excelFile, where, setExcelFile, inputFocus }) => {
  const [loading, setLoading] = useState(false);

  const CHUNK_SIZE = 1024 * 1024; // 1MB chunk size

  const convertirExcelAJson = async () => {
    if (excelFile) {
      setLoading(true); // Mostrar el loader mientras se suben los datos

      const lector = new FileReader();

      lector.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result;
        if (data) {
          const book = XLSX.read(data as string, { type: 'binary' });
          const sheetName = book.SheetNames[0];
          const worksheet = book.Sheets[sheetName];
          const jsonData: unknown[] = XLSX.utils.sheet_to_json(worksheet);

          const jsonChunks = chunkArray(jsonData, CHUNK_SIZE);
          const offers : Product[] = []
          
          jsonChunks.forEach((chunk) => {
            chunk.forEach((item: unknown) => {
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
                producto.validity ? offers.push(producto) : uploadData(producto, producto.cod)
                uploadData(offers, "ofertas")
                //const uploadPromise = uploadData(producto, where);
                //promises.push(uploadPromise);
              }
            });
          });

        }
      };

      lector.readAsBinaryString(excelFile);
      setExcelFile(null);
      inputFocus();
    } else {
      alert('Selecciona un archivo Excel primero.');
    }
  };

  // Función para dividir un array en partes más pequeñas
  const chunkArray = (arr: unknown[], size: number) => {
    return arr.reduce((chunks: unknown[][], item: unknown) => {
      if (!chunks.length || chunks[chunks.length - 1].length === size) {
        chunks.push([item]);
      } else {
        chunks[chunks.length - 1].push(item);
      }
      return chunks;
    }, []);
  };

  return (
    <div className={`overflow-hidden ${cod !== '6935364070854' ? 'w-0' : 'w-32 p-4'} grid place-items-center  absolute z-50 w-screen h-screen  transition-all border-r-2`}>
      <div className="grid gap-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-64 file:border-solid file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-2 file:font-bold file:border-orangeMedit file:text-sm  file:bg-white file:text-orangeMedit hover:file:bg-orangeMedit hover:file:text-white transition-all"
        />
        <button
          className="border-2 p-2 rounded-lg text-orangeMedit border-orangeMedit text-xl bg-white font-bold hover:bg-orangeMedit hover:text-white transition-all"
          onClick={convertirExcelAJson}
          disabled={excelFile == null ? true : loading ? true : false}
        >
          {loading ? 'Subiendo...' : where === 'products' ? 'Actualizar precios' : 'Subir Ofertas'}
        </button>
      </div>
    </div>
  );
};

export default Update;
