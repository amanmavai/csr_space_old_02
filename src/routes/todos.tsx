import React, { useState } from "react";

export function Component() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Read about ViteJS", completed: false },
  ]);

  function onAddTodo(text) {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
  }

  function updateTodo(id, newText) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      }),
    );
  }

  const [addText, setAddText] = React.useState("");
  function handleAddText(e) {
    if (e.key === "Enter" && addText.trim() !== "") {
      onAddTodo(addText);
      setAddText("");
    }
  }
  return (
    <div className="container mx-auto flex flex-col">
      <input
        placeholder="Add todo..."
        type="text"
        className="border border-solid border-green-300 text-3xl"
        value={addText}
        onChange={(e) => setAddText(e.target.value)}
        onKeyDown={handleAddText}
      />
      <div className="mt-4 flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>
  );
}

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" className="inline-block" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      {isEditing ? (
        <input
          value={todo.text}
          onChange={(e) => {
            onUpdate(todo.id, e.target.value);
          }}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => (e.key === "Enter" ? setIsEditing(false) : undefined)}
          className="border border-solid border-blue-200 p-2"
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>{todo.text}</div>
      )}
      <button className="rounded-md bg-red-400 px-4 text-gray-800" onClick={() => onDelete(todo.id)}>
        X
      </button>
    </div>
  );
}
