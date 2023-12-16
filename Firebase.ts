import { initializeApp } from "firebase/app";
import { getStorage,} from "firebase/storage";
import {doc, getFirestore, setDoc} from "firebase/firestore";
import { Product } from "./src/Types";
const firebaseConfig = {
    apiKey: "AIzaSyBHoMgxgaEs-pP5j8ElO2jWjWjg1BA83cQ",
    authDomain: "verificador-a1982.firebaseapp.com",
    projectId: "verificador-a1982",
    storageBucket: "verificador-a1982.appspot.com",
    messagingSenderId: "1076524478470",
    appId: "1:1076524478470:web:5ab5ad595c624188119387"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

 

export const uploadData = async (data: Product[]) => {
  const collectionRef = doc(db, 'la mediterranea', "products");

  try {
    await setDoc(collectionRef, {data});
    console.log('Datos subidos exitosamente');
  } catch (error) {
    console.error('Error al subir datos:', error);
  }
};


