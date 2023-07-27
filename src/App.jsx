import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Layout from "./components/Layout"
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

function App() {

  // Access the environment variables
  const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  };
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App