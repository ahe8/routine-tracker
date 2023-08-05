import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { DateProvider } from "./contexts/DateContext";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { defaultTheme } from "./utils/theme";

import { NotesProvider } from "./contexts/NotesContext";

function App() {
  return (
    <>
      <CssBaseline>
        <ThemeProvider theme={defaultTheme}>
          <AuthProvider>
            <NotesProvider>
              <DateProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </BrowserRouter>{" "}
              </DateProvider>
            </NotesProvider>
          </AuthProvider>
        </ThemeProvider>
      </CssBaseline>
    </>
  );
}

export default App;
