// Supongamos que un producto tiene un formato específico
export interface Product {
    cod:string;
    name: string;
    brand:string;
    price: number;
    presentation:string;
    img:string;
    validity:string;
    // Agrega más propiedades según sea necesario
}

export interface dateType {
    year: number;
    month: number;
    day: number;
   
}
  

export type ProducttoMap = {
    data:Product


    // Agrega más propiedades según sea necesario
}
  