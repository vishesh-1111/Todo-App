"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react"
import { updateTodoStatusAction } from "@/app/_action"
import { DropdownTodo } from "./dropdown-todo"

type TodoProps = {
  todo: any;
}

function TodoList({ todo }: TodoProps) {
  const [isPending, startTransition] = useTransition()
  

  return (
<li className="flex items-center p-4 border-b transition-colors hover:bg-muted/50">
  <div className="w-8 mr-12">
    <Checkbox
      id={todo?.title}
      defaultChecked={todo?.done}
      onCheckedChange={(checked: boolean) => {
        startTransition(() => {
          updateTodoStatusAction(todo?._id, checked)
        });
      }}
    />
  </div>

  <div className="flex flex-1 items-center justify-between gap-4">
   
    <span className="flex-1 truncate">{todo?.title}</span>
    <span className="flex-1 truncate">{todo?.description}</span>
    <span className="flex-1 truncate">
      {todo?.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No due date"}
    </span>
  </div>

  <div className="ml-auto">
    <DropdownTodo todo={todo} />
  </div>
</li>
  )
}

export default TodoList