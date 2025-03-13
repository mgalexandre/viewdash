"use client"
import React from 'react'
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import AddTodo from './add-todo-actions';

type Todos = {
  id: number;
  title: string;
};

export default function FetchTodos() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todos[]>([]);

  const fetchTodos = async () => {
    if (!session) return;
    const res = await fetch("/api/todos/get", {
      credentials: 'include'
    });
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    if (!session) return;
    fetchTodos();
  }, [session]);

  return (
    <div>
      <h2>Your Todos</h2>
      <AddTodo />
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
}
