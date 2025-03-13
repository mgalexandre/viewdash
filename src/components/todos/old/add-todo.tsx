"use client";
import { useState } from "react";
import React from 'react'
import { useRouter } from "next/navigation";

interface AddTodoProps {
  onAdd: () => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const addTodo = async () => {
    await fetch("/api/todos/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({ title }),
    });
    setTitle("");
    onAdd(); // Call the callback function after successful addition
    router.refresh();
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}
