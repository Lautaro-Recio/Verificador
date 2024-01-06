import { initializeApp } from "firebase/app";
import { getStorage, } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Product } from "./src/Types";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_RENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)



export const uploadData = async (data: Product[], where: string) => {
  const collectionRef = doc(db, 'la mediterranea', where);

  try {
    await setDoc(collectionRef, { data });
    console.log('Datos subidos exitosamente');
  } catch (error) {
    console.error('Error al subir datos:', error);
  }
};



// Llamas a la función para obtener la colección


