import React, { useState } from "react";
import { setJWT } from "../../api/api-utils";
import { NODE_URL } from "../../api/config";

import s from "./RegistrationForm.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "../Snackbar/Snackbar";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false)


  const navigate = useNavigate()
  const handleLogin = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${NODE_URL}/auth/login`, {
        email,
        password,
      });
      setMessage('Login success')
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false)
        navigate('/')
        navigate(0)
      }, 1300)
      setJWT(response.data.token);
    } catch (error) {
      console.error("Login error:", error);
      setMessage(
        "Incorrect credentials. Please try again."
      );
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false)
      }, 1300)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className={s.form} onSubmit={handleLogin}>
        <input
          className={s.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={s.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={s.button} type="submit">Login</button>
      </form>
      <Link className={s.button} to="/register">Register</Link>
      {showSnackbar && <Snackbar message={message} />}
    </div>
  );
};

export default Login;
