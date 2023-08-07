import { useState } from 'react'
import { LoginComponent } from "../components/LoginComponent"
import { RegisterComponent } from "../components/RegisterComponent"
import "./Login.css"
import { useLocation } from 'react-router-dom'

import { GlobalStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Login() {
    const [currentForm, setCurrentForm] = useState(useLocation().state ? "register" : "login");
    const theme = useTheme();

    const toggleForm = (forName) => {
        setCurrentForm(forName);
    }
    return (
        <div className="login-page">
            <GlobalStyles
                styles={{
                    body: {
                        backgroundColor: theme.primary.background,
                        color: theme.primary.font,
                    },
                }}
            />
            {
                currentForm === "login" ? <LoginComponent onFormSwitch={toggleForm} /> : <RegisterComponent onFormSwitch={toggleForm} />
            }
        </div>
    );
}