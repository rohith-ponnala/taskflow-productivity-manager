import { useState, useEffect } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res =
        await API.post(
          "/auth/login",
          {
            email,
            password
          }
        );
      localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "userName",
  res.data.user.name
);
localStorage.setItem(
  "userEmail",
  res.data.user.email
);
      toast.success(
        "Login Successful"
      );

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };
  useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }

}, []);
  return (

    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-logo">
          ✓
        </div>

        <h1>
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to continue managing
          your tasks efficiently.
        </p>

        <form
          onSubmit={submitHandler}
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <div
            className="password-box"
          >

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword
                ? "🙈"
                : "👁️"}
            </span>

          </div>

          <button
            className="auth-btn"
          >
            Login
          </button>

        </form>

        <Link
          className="forgot-link"
          to="/forgot-password"
        >
          Forgot Password?
        </Link>

        <p className="auth-footer">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;