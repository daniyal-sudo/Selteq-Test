import React, { useState, useEffect } from "react";
import "./App.css";

import Clock from "./Task2/Clock";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateRandomId } from "./Constant/commonUtility";
import TodoForm from "./Task1/TodoForm";
import TodoItem from "./Task1/TodoItem";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const resetTheForm = () => {
    setNewDescription("");
    setNewTodoTitle("");
    setEditingIndex(null);
  };

  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
      id: generateRandomId(),
    };
    if (newTodoTitle !== "") {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newToDoObj);

      setAllTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
      toast.success("Todo added successfully");
      resetTheForm();
    } else {
      toast.error("Please add title");
    }
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodos) {
      setAllTodos(savedTodos);
    }
  }, []);

  const handleToDoDelete = (index) => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);

    toast.success("Todo deleted successfully");
    resetTheForm();
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewTodoTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
  };

  const handleCopyClick = (index) => {
    setEditingIndex(null);
    setNewTodoTitle(allTodos[index].title);
    setNewDescription(allTodos[index].description);
  };

  const handleEditSave = () => {
    let updatedTodos = [...allTodos];
    updatedTodos[editingIndex] = {
      title: newTodoTitle,
      description: newDescription,
    };

    setAllTodos(updatedTodos);
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
    setEditingIndex(null);
    resetTheForm();
    toast.success("Todo edit successfully");
  };

  const handleDragEnd = (result) => {
    // console.log(result, "result");
    if (!result.destination) return;
    const items = Array.from(allTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAllTodos(items);
    localStorage.setItem("todolist", JSON.stringify(items));
    resetTheForm();
  };

  console.log(allTodos, "allTodos");

  return (
    <div className="App">
      <div className="left-panel">
        <Clock />
        <h2>Todo List</h2>

        <TodoForm
          setNewTodoTitle={setNewTodoTitle}
          newTodoTitle={newTodoTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          editingIndex={editingIndex}
          handleEditSave={handleEditSave}
          handleAddNewToDo={handleAddNewToDo}
        />
        <TodoItem
          allTodos={allTodos}
          handleCopyClick={handleCopyClick}
          handleEditClick={handleEditClick}
          handleToDoDelete={handleToDoDelete}
          handleDragEnd={handleDragEnd}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
