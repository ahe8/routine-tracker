import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Layout from "./components/Layout"
import { AuthProvider } from "./contexts/AuthContext"

import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { defaultTheme } from "./utils/theme";

function App() {
  // Your Firebase project config
  const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  };

  // Initialize Firebase only once
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
