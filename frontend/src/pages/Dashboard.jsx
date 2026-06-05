import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import ProfileDropdown from "../components/ProfileDropdown";
import CalendarView from "../components/CalendarView";
import AddTaskModal from "../components/AddTaskModal";


function Dashboard() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] =
  useState(new Date());
  const [search, setSearch] =
  useState("");
  const [loading, setLoading] = useState(true);

  const userName =
    localStorage.getItem("userName") || "User";

  const fetchTodos = async () => {
    try {
      setLoading(true);

const res = await API.get("/todos");
setTodos(res.data);

setLoading(false);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  fetchTodos();
}, [navigate]);

  useEffect(() => {
    const overdue = todos.filter(
      (todo) =>
        !todo.completed &&
        todo.dueDate &&
        new Date(todo.dueDate) <
          new Date()
    );

    if (
      overdue.length > 0 &&
      Notification.permission ===
        "granted"
    ) {
      new Notification(
        "⚠️ Task Reminder",
        {
          body: `You have ${overdue.length} overdue task(s)`,
        }
      );
    }
  }, [todos]);


  const createTask = async (
    taskData
  ) => {
    try {
      await API.post(
        "/todos",
        taskData
      );

      toast.success(
        "Task Added Successfully"
      );

      setShowModal(false);

      fetchTodos();
    } catch {
      toast.error(
        "Failed To Add Task"
      );
    }
  };

  const toggleTodo = async (
    id,
    completed
  ) => {
    try {
      await API.put(`/todos/${id}`, {
        completed: !completed,
      });

      fetchTodos();
    } catch {
      toast.error(
        "Failed To Update"
      );
    }
  };

  const deleteTodo = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/todos/${id}`
      );

      toast.success(
        "Task Deleted"
      );

      fetchTodos();
    } catch {
      toast.error(
        "Delete Failed"
      );
    }
  };

  const totalTasks =
    todos.length;

  const completedTasks =
    todos.filter(
      (task) => task.completed
    ).length;

  const pendingTasks =
    totalTasks -
    completedTasks;

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );
const tips = [
  "Complete high priority tasks first.",
  "Break large goals into smaller tasks.",
  "Review overdue tasks daily.",
  "Focus on one task at a time.",
];

const randomTip =
  tips[new Date().getDate() % tips.length];
const filteredTodos =
  todos.filter((todo) =>
    todo.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );
        if (loading) {
  return <h2>Loading...</h2>;
}
  return (
    <div className="dashboard">

      <div className="dashboard-navbar">
        <div className="dashboard-logo">
          TaskFlow - Personal Productivity Manager
        </div>
        <div className="nav-right">
          <ProfileDropdown />
        </div>
      </div>

      <div className="welcome-banner">
        <div className="welcome-header">
          <div>
            <h2>
              👋 Welcome Back,
              {" "}
              {userName}
            </h2>

            <p>
              Plan smarter,
              stay organized,
              and boost
              productivity.
            </p>
          </div>
        </div>
      </div>

      <div className="stats">

        <div className="card">
          <span className="stat-icon">
            📋
          </span>

          <h3>Total</h3>

          <p>
            {totalTasks}
          </p>
        </div>

        <div className="card">
          <span className="stat-icon">
            ✅
          </span>

          <h3>
            Completed
          </h3>

          <p>
            {completedTasks}
          </p>
        </div>

        <div className="card">
          <span className="stat-icon">
            ⏳
          </span>

          <h3>Pending</h3>

          <p>
            {pendingTasks}
          </p>
        </div>

        <div className="card">
          <span className="stat-icon">
            🚀
          </span>

          <h3>
            Productivity
          </h3>

          <p>
            {productivity}%
          </p>
        </div>

      </div>

      <div className="add-task-section">

        <button
          className="add-task-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          + Add Task
        </button>

      </div>
<div
className="search-box"
>

<input
type="text"
placeholder="🔍 Search Tasks..."
value={search}
onChange={(e) =>
setSearch(e.target.value)
}
/>

</div>
      <CalendarView
  todos={filteredTodos}
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  onToggleComplete={toggleTodo}
  onDeleteTask={deleteTodo}
/>

      <div className="tips-card">

<h2>💡 Productivity Tip</h2>

<p>{randomTip}</p>

</div>
      {showModal && (
        <AddTaskModal
          onClose={() =>
            setShowModal(false)
          }
          onSave={createTask}
        />
      )}

    </div>
  );
}

export default Dashboard;