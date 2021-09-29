import React, { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
const Form = ({
  input,
  setInput,
  todos,
  setTodos,
  editTodos,
  setEditTodos,
}) => {
  useEffect(() => {
    if (editTodos) {
      setInput(editTodos.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodos]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodos("");
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editTodos) {
      setTodos([...todos, { id: uuidV4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodos.id, editTodos.completed);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Enter a ToDo...."
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodos ? "Ok" : "Add"}
      </button>
    </form>
  );
};

export default Form;
