import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView({
  todos,
  selectedDate,
  setSelectedDate,
  onToggleComplete,
  onDeleteTask,
}) {

  const getTasksForDate = (date) => {
    return todos.filter((todo) => {
      if (!todo.dueDate) return false;

      return (
        new Date(todo.dueDate).toDateString() ===
        date.toDateString()
      );
    });
  };

  const selectedTasks =
    getTasksForDate(selectedDate);

  const getPriorityClass = (
    priority
  ) => {
    if (priority === "High")
      return "high-priority";

    if (priority === "Medium")
      return "medium-priority";

    return "low-priority";
  };

  return (
    <div className="calendar-layout">

      <div className="calendar-panel">

        <div className="panel-header">
          <h2>
            📅 Smart Calendar
          </h2>

          <span className="task-summary">
            {todos.length} Tasks
          </span>
        </div>

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date }) => {
            const tasks =
              getTasksForDate(date);

            if (!tasks.length)
              return null;

            return (
              <div className="calendar-badge">
                {tasks.length}
              </div>
            );
          }}
          tileClassName={({ date }) => {
            const today =
              new Date();

            if (
              date.toDateString() ===
              today.toDateString()
            ) {
              return "today-tile";
            }

            return null;
          }}
        />

      </div>

      <div className="task-panel">

        <div className="panel-header">

          <h2>
            📌 Tasks For
          </h2>

          <span className="selected-date">
            {selectedDate.toLocaleDateString()}
          </span>

        </div>

        {selectedTasks.length === 0 ? (
          <div className="empty-day">

            <div className="empty-icon">
              📭
            </div>

            <h3>
              🎉 No Tasks Scheduled
            </h3>
            <p>
              Great! You have no pending tasks for this day.
            </p>

          </div>
        ) : (
          selectedTasks.map(
            (task) => (
              <div
                key={task._id}
                className="day-task-card"
              >
                <div className="task-top">

                  <h4>
                    {task.completed
                      ? "✅"
                      : "📌"}{" "}
                    {task.title}
                  </h4>

                  <span
                    className={`priority-tag ${task.priority}`}
                  >
                    {task.priority}
                  </span>

                </div>

                {task.description && (
                  <p className="task-description">
                    {task.description}
                  </p>
                )}

                <div className="task-meta">

                  <span
                    className={`priority-indicator ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                  <span>
                    📅{" "}
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "No Date"}
                  </span>

                </div>

                <div className="task-actions">

                  <button
                    className="complete-btn"
                    onClick={() =>
                      onToggleComplete(
                        task._id,
                        task.completed
                      )
                    }
                  >
                    {task.completed
                      ? "Undo"
                      : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      onDeleteTask(
                        task._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}

export default CalendarView;