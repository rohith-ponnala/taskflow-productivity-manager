import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const submitHandler = async (e) => {

    e.preventDefault();

    if (
      password !== confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {

      await API.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      toast.success(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
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
          Create Account
        </h1>

        <p className="auth-subtitle">
          Start organizing your tasks
          and boost your productivity.
        </p>

        <form onSubmit={submitHandler}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

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

          <div className="password-box">

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

          <div className="password-box">

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <span
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword
                ? "🙈"
                : "👁️"}
            </span>

          </div>

          <button
            className="auth-btn"
          >
            Create Account
          </button>

        </form>

        <p className="auth-footer">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Register;