import { useState } from 'react'
import { LoginComponent } from "../components/LoginComponent"
import { RegisterComponent } from "../components/RegisterComponent"
import "./Login.css"

export default function Login() {
    const [currentForm, setCurrentForm] = useState("login");
    const toggleForm = (forName) => {
        setCurrentForm(forName);
    }
    return (
        <div className="login-page">
            {
                currentForm === "login" ? <LoginComponent onFormSwitch={toggleForm} /> : <RegisterComponent onFormSwitch={toggleForm} />
            }
        </div>
    );
}