import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"


export const LoginComponent = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const { signin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{ 
            await signin(email, pass);
            navigate('/');
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email@email.com" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={()=>props.onFormSwitch("register")}> Register here</button>
            <h2>{errMsg}</h2>
        </div>
    )
}