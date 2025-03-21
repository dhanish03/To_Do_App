import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  // Start editing a todo
  const handleEditStart = (index) => {
    setEditIndex(index);
    setEditValue(todos[index]);
  };

  // Handle edit input change
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  // Save the edited todo
  const handleEditSave = () => {
    if (editValue.trim()) {
      const newTodos = [...todos];
      newTodos[editIndex] = editValue;
      setTodos(newTodos);
      setEditIndex(null);
    }
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditIndex(null);
  };

  // Handle key press in edit mode
  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new to-do"
        />
        <button className="add-button" onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.length === 0 ? (
          <p>No tasks yet. Add one to get started!</p>
        ) : (
          todos.map((todo, index) => (
            <li key={index}>
              {editIndex === index ? (
                <div className="edit-container">
                  <input
                    type="text"
                    className="edit-input"
                    value={editValue}
                    onChange={handleEditChange}
                    onKeyDown={handleEditKeyPress}
                    autoFocus
                  />
                  <div className="edit-buttons">
                    <button className="save-button" onClick={handleEditSave}>Save</button>
                    <button className="cancel-button" onClick={handleEditCancel}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="todo-text">{todo}</span>
                  <div className="todo-buttons">
                    <button 
                      className="edit-button" 
                      onClick={() => handleEditStart(index)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteTodo(index)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;