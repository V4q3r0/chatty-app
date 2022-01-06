import { initializeApp } from "firebase/app";
import * as authConfig from "firebase/auth";
import * as dbConfig from "firebase/database";

const config = {
    apiKey: "AIzaSyC5SSFs8YydHVb4_jiRt3OT975BoDum5Ug",
    authDomain: "chatty-505fd.firebaseapp.com",
    projectId: "chatty-505fd",
    storageBucket: "chatty-505fd.appspot.com",
    messagingSenderId: "112810196177",
    appId: "1:112810196177:web:0ffef9380e94faa1fc59f0",
    measurementId: "G-4778B4D7GP"
};

initializeApp(config);
export const auth = authConfig;
export const db = dbConfig;
