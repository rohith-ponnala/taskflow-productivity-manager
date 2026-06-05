import { useState } from "react";

function AddTaskModal({
  onClose,
  onSave,
}) {
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("Study");

  const [
    priority,
    setPriority,
  ] = useState("Medium");

  const [
    dueDate,
    setDueDate,
  ] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSave({
      title,
      description,
      category,
      priority,
      dueDate,
    });
  };

  return (
    <div className="modal-overlay">

      <div className="task-modal">

        <div className="modal-header">

          <h2>
            ✨ Create New Task
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">

          <label>
            Task Title
          </label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <label>
            Description
          </label>

          <textarea
            rows="4"
            placeholder="Task description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <label>
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >
            <option>
              Study
            </option>

            <option>
              Work
            </option>

            <option>
              Personal
            </option>

            <option>
              Health
            </option>

            <option>
              Other
            </option>
          </select>

          <label>
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
          >
            <option>
              High
            </option>

            <option>
              Medium
            </option>

            <option>
              Low
            </option>
          </select>

          <label>
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />

        </div>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Save Task
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddTaskModal;