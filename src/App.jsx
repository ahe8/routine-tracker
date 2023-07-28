import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";

import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { defaultTheme } from "./utils/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
