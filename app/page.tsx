import { TodoForm } from "@/components/todos/todo-form"
import TodoList from "@/components/todos/todo-list"
import { getTodos } from "@/lib/todo"

export default async function IndexPage() {
  const { todos } = await getTodos()
  console.log(todos);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Sample Todo App.
        </h1>
        <p className=" max-w-[700px] text-lg text-muted-foreground">
          Create a Todo list easily!
        </p>
      </div>
      <TodoForm />
  
      <ul className="flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground rounded-lg border shadow-md">
        {

          todos?.map((todo:any,id:number) => (
            <TodoList key={todo?._id} todo={JSON.parse(JSON.stringify(todo))} />        
          ))
        }
      </ul>
    </section>
  )
}
