import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(res.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-container">
      <form
        className="auth-box"
        onSubmit={submitHandler}
      >
        <h1>Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;