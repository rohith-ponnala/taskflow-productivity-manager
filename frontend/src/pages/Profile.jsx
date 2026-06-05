import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/profile.css";

function Profile() {

  const name =
    localStorage.getItem("userName") || "User";

  const email =
    localStorage.getItem("userEmail") || "No Email";
    const [todos, setTodos] = useState([]);

useEffect(() => {
  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchTodos();
}, []);
const totalTasks = todos.length;

const completedTasks =
  todos.filter(
    (task) => task.completed
  ).length;

const productivity =
  totalTasks === 0
    ? 0
    : Math.round(
        (completedTasks / totalTasks) * 100
      );

  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar-large">
          {name.charAt(0).toUpperCase()}
        </div>

        <h1>{name}</h1>

        <p>{email}</p>

      </div>

      <div className="profile-stats">

        <div className="profile-stat-card">
  <h2>📋</h2>
  <p>Total Tasks</p>
  <h3>{totalTasks}</h3>
</div>

<div className="profile-stat-card">
  <h2>✅</h2>
  <p>Completed</p>
  <h3>{completedTasks}</h3>
</div>

<div className="profile-stat-card">
  <h2>🚀</h2>
  <p>Productivity</p>
  <h3>{productivity}%</h3>
</div>
      </div>

    </div>

  );

}

export default Profile;