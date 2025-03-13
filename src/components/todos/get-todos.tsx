import { auth } from "@/lib/auth";
import { getTodos } from "@/app/actions/actions-gettodos";
import { headers } from "next/headers";


export default async function FetchTodos() {
  const session= auth.api.getSession(
    { headers: new Headers(await headers())}
  );

    if (!session) return;
    const todos = await getTodos();

  return (
    <div>
      <h2>Meus Todos</h2>
      <button className="bg-neutral-100 my-4">AI Check</button>
      {todos.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4">
          {todos.map((todo) => (
            <li className="bg-neutral-100 py-10 flex items-center justify-center border border-neutral-200 rounded-sm" key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
}
