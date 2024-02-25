// TodoForm.js
import React, { useState } from "react";

function TodoForm({
  handleAddNewToDo,
  handleEditSave,
  newTodoTitle,
  setNewTodoTitle,
  newDescription,
  setNewDescription,
  editingIndex,
}) {
  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>Title</label>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="todo-input-item">
        <label>Description</label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <div className="todo-input-item">
        {editingIndex !== null ? (
          <button
            className="primary-btn"
            type="button"
            onClick={handleEditSave}
          >
            Update
          </button>
        ) : (
          <button
            className="primary-btn"
            type="button"
            onClick={handleAddNewToDo}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoForm;
