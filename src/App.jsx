import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Layout from "./components/Layout"
import { AuthProvider } from "./contexts/AuthContext"

function App() {

  return (  
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App