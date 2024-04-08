import { initializeApp } from "firebase/app";
import { getStorage, } from "firebase/storage";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Product, ProducttoMap } from "./src/Types";
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



export const uploadData = async (data: Product[] | Product, where: string) => {
  if (where !== "ofertas") {

    const collectionRef = doc(db, 'la mediterranea', where);

    try {
      await setDoc(collectionRef, { data });
      console.log('Datos subidos exitosamente');
    } catch (error) {
      console.error('Error al subir datos:', error);
    }
  } else {
    const collectionRef = doc(db, 'Ofertas La mediterranea ', where);

    try {
      await setDoc(collectionRef, {data} ); 
      console.log('Datos subidos exitosamente');
    } catch (error) {
      console.error('Error al subir datos:', error);
    }
  }
};

export const getProd = async (docId: string) => {
  const docRef = doc(db, "la mediterranea", docId);
  const docSnap = await getDoc(docRef);
  try {

    if (docSnap.exists()) {
      console.log(docSnap.data())

      return docSnap.data() as ProducttoMap
    }
  } catch {

    console.error("No such document!");

  }
}

export const getOffers = async () => {
  const docRef = doc(db, "Ofertas La mediterranea ", "ofertas");
  const docSnap = await getDoc(docRef);
  try {
    const data = docSnap.data();
    console.log(data?.data)
    if (data && data.data) {
      console.log(data.data);
      return data.data as ProducttoMap;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
}

// Llamas a la función para obtener la colección


