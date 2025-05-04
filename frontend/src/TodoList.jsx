import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState(["eat breakfast", "take a shower"]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(tasks => [...tasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function saveTasks(tasks) {
    console.log("saving tasks...")
  }

  return (
    <div id="todo-container">
      <h1>Todo List</h1>

      <div>
        <input
          className="todo-input"
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />

        <button className="add-entry-button" onClick={addTask}>
          Add entry
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>

              <span className="todo-entry">{task}</span>

              <button className="delete-entry-button" onClick={() => deleteTask(index)}>
                Delete
              </button>

            </li>
          )
        })}
      </ul>

      <button className="save-changes-button" onClick={saveTasks}>
        Save changes
      </button>

    </div>);
}
export default TodoList;
