import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { defaultTheme } from "./utils/theme";
import { AuthProvider } from "./contexts/AuthContext";

import { NotesProvider } from "./contexts/NotesContext";

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline>
          <AuthProvider>
            <NotesProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </BrowserRouter>
            </NotesProvider>
          </AuthProvider>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
