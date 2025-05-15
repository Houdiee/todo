import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, token } = useAuth();

  useEffect(() => {
    if (user && user.entries) {
      setTasks(user.entries);
      setLoading(false);
    }
  }, [user]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(tasks => [...tasks, { title: newTask, isCompleted: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  }

  async function saveTasks() {
    try {
      await axios.put("http://localhost:5000/api/entries", tasks, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setError("Tasks saved successfully!");
      console.log("Tasks saved successfully!");
    }
    catch (err) {
      setError("There was an error saving tasks");
      console.error("Failed to save tasks:", err);
    }
  }

  if (loading === true) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="container" id="todolist">
      <h1>Todo List</h1>

      <div>
        <input
          className="text-input"
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              addTask();
            }
          }}
        />
        <button className="add-entry-button" onClick={addTask}>
          Add entry
        </button>
      </div>

      {error && <div style={{ color: 'red', marginTop: "1em" }}>{error}</div>}


      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              <span
                className={`todo-entry ${task.isCompleted ? 'completed' : ''}`}
                onClick={() => toggleComplete(index)}
              >
                {task.title}
              </span>

              <button className="entry-button" id="delete" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <button className="entry-button" id="save-changes" onClick={saveTasks}>
        Save changes
      </button>

    </div >
  );
}

export default TodoList;

