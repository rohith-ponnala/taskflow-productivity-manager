import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { ThemeContext }
from "../context/ThemeContext";

function ProfileDropdown() {

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  const {
    darkMode,
    setDarkMode
  } = useContext(ThemeContext);

  const name =
    localStorage.getItem(
      "userName"
    ) || "User";

  const email =
    localStorage.getItem(
      "userEmail"
    );

  const logout = () => {

    localStorage.removeItem("token");
localStorage.removeItem("userName");

    navigate("/login");

  };

  return (
  <div className="profile-wrapper">

    <div
      className="profile-avatar"
      onClick={() => setOpen(!open)}
    >
      {name.charAt(0).toUpperCase()}
    </div>

    {open && (

      <div className="profile-menu">

        <div className="profile-user">

          <div className="profile-user-avatar">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{name}</h3>
            <p>{email}</p>
          </div>

        </div>

        <hr />

        <button
className="dropdown-btn"
onClick={() => navigate("/profile")}
>
          👤 My Profile
        </button>

        <button
className="dropdown-btn"
onClick={() =>
setDarkMode(!darkMode)
}
>
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        <button
  className="dropdown-btn logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

    )}

  </div>
);

}

export default ProfileDropdown;