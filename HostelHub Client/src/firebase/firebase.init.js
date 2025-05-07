// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClz8IgU5wJRZ9CbiIpIZ_infhvZmuI8KA",
    authDomain: "hostel-management-system-78bac.firebaseapp.com",
    projectId: "hostel-management-system-78bac",
    storageBucket: "hostel-management-system-78bac.firebasestorage.app",
    messagingSenderId: "380438462521",
    appId: "1:380438462521:web:5417d201262e9428cd4de8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
