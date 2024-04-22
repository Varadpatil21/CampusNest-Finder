import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyDdvFxRveZHJx2Q2FDWGj_h4SLeLliI_qM",
    authDomain: "test1-72e07.firebaseapp.com",
    databaseURL: "https://test1-72e07-default-rtdb.firebaseio.com",
    projectId: "test1-72e07",
    storageBucket: "test1-72e07.appspot.com",
    messagingSenderId: "943670079811",
    appId: "1:943670079811:web:b4272ae35bc8d85696bff6"
  };
  const app = initializeApp(firebaseConfig);  

  const auth=getAuth();
  export {app,auth};

  export const database = getDatabase(app);