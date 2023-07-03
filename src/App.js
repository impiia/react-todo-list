import React, { useState, useEffect } from "react";
import "./App.css";
import initialTasks from "./tasks.json";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const tasksWithDefaultChecked = initialTasks.map((task) => ({
      ...task,
      checked: false,
    }));
    setTasks(tasksWithDefaultChecked);
  }, []);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: Date.now(),
        text: newTask,
        checked: false,
      };

      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleTaskCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleDeleteSelectedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.checked));
  };

  const isDeleteDisabled = tasks.length === 0 || !tasks.some((task) => task.checked);

  return (
    <div className="wrapper">
      <div className="todo-list">
        {tasks.map((task) => (
          <div key={task.id} className="todo-item">
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => handleTaskCheckboxChange(task.id)}
            />
            <div className={`task ${task.checked ? "completed" : ""}`}>
              {task.text}
            </div>
          </div>
        ))}

        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Enter task"
          />
          <button className="add-button" onClick={handleAddTask}>
            Add Task
          </button>
          <button
            className={`delete-button ${isDeleteDisabled ? "disabled" : ""}`}
            onClick={handleDeleteSelectedTasks}
            disabled={isDeleteDisabled}
          >
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
