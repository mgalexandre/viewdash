"use client"

import { useState, useTransition } from "react";
import { adicionarTodoAction } from "@/app/actions/actions-todo";

export default function AddTodo() {
    const [titulo, setTitulo] = useState("");
    const [isPending, startTransition] = useTransition();


    const addTodo = async () => {
        startTransition( async () => {
            try {
           await adicionarTodoAction(titulo);
              setTitulo("");
            }
              catch (error) {
                console.error("Error adding todo:", error);
          }
        });
    };

    return (
        <div>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="adicionar todo" disabled={isPending} type="text" />
            <button onClick={addTodo} disabled={isPending}>{isPending ? "Adicionando..." : "Adicionar"}</button>
        </div>
    );
}
