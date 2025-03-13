

import AddTodo from '@/components/todos/add-todo-actions'
import FetchTodos from '@/components/todos/get-todos'

export default function Naosei() {

  return (
    <div>
      <h1>Protegido</h1>
      <AddTodo />
      <FetchTodos />
    </div>
  )
}
