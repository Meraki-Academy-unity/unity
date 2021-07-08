import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../reducers/login";
import { setUserId } from "../../../reducers/userID";
import loginImg from "./Trip-cuate.png";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id,
    };
  });
console.log("deyaa kman",state.id)
  const signIn = () => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        setMessage("Login Successful");
        localStorage.setItem("token", result.data.token);
        console.log("deyaa", result.data)
        dispatch(setToken(result.data.token));
        dispatch(setUserId(result.data.user_id));
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };
  return (
    <div className="container">
      <div className="auth">
        <div className="leftAuth">
          <img src={loginImg} alt="" />
        </div>
        <div className="rightAuth">
          <div>
            <h1>Welcome, Login</h1>
          </div>
          <table>
            <tr>
              <td>
                <label>Email</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Password</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={signIn}>Login</button>
              </td>
            </tr>
          </table>
          <p>{message}</p>
          <p>
            Don't have account?{" "}
            <Link to="/register" className="authLink">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
