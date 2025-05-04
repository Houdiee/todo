import React, { useState } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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

  function saveTasks(tasks) {
    console.log("saving tasks...")
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

      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>

              <span
                className={`todo-entry ${task.isCompleted ? 'completed' : ''}`}
                onClick={() => toggleComplete(index)}>
                {task.title}
              </span>

              <button className="entry-button" id="delete" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          )
        })}
      </ul>

      <button className="entry-button" id="save-changes" onClick={saveTasks}>
        Save changes
      </button>

    </div >);
}
export default TodoList;
