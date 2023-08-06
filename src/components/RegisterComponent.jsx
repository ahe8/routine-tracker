import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authErrors } from "../utils";

export const RegisterComponent = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (pass !== passConfirmation) {
      setErrorMsg("Passwords must be the same!");
    } else {
      try {
        const res = await signup(email, pass);

        const body = {
          email: email,
          user_id: res.user.uid,
          first_name: name,
        };

        await fetch(`http://localhost:5001/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        navigate("/");
      } catch (err) {
        setErrorMsg(authErrors[err.code]);
      }
    }
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit} action="/">
        <label htmlFor="name">First name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="First name"
          id="name"
          name="name"
          required
        ></input>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email@email.com"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="**********"
          id="password"
          name="password"
          required
        />
        <label htmlFor="passConfirmation">Confirm Password</label>
        <input
          value={passConfirmation}
          onChange={(e) => setPassConfirmation(e.target.value)}
          type="password"
          placeholder="**********"
          id="passConfirmation"
          name="passConfirmation"
          required
        />
        <button type="submit">Register</button>
      </form>
      <h3 className="errorMsg">{errorMsg}</h3>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here
      </button>
    </div>
  );
};
