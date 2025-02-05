"use client"
import { deleteTodoAction, updateTodoAction } from "@/app/_action"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState,useEffect } from "react"
import { useForm } from "react-hook-form"

export function DropdownTodo({ todo }: { todo: any }) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<any>(null)
  const [theme, setTheme] = useState<string | null>(null);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  })
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme);
  }, []);
  const deleteTodo = () => {
    deleteTodoAction(todo._id)
  }

  const updateTodo = () => {
    setSelectedTodo(todo)
    setIsUpdateModalOpen(true)
    setValue("title", todo.title)
    setValue("description", todo.description)
  }

  const handleUpdateSubmit = async (data: { title: string, description: string }) => {
    if (selectedTodo) {
      await updateTodoAction(selectedTodo._id, data) 
      setIsUpdateModalOpen(false) 
  }
  
}
  const dropdownThemeClass = theme === 'black' ? 'bg-black text-white' : 'bg-white text-black';

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={`text-gray-700 hover:text-gray-900 ${dropdownThemeClass}`}>...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`w-48 p-2 ${dropdownThemeClass} border border-gray-300 shadow-lg rounded-md`}>
          <DropdownMenuItem
            onClick={deleteTodo}
            className={`text-red-600 hover:bg-red-100 rounded-md p-2 ${dropdownThemeClass}`}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={updateTodo}
            className={`text-blue-600 hover:bg-blue-100 rounded-md p-2 ${dropdownThemeClass}`}
          >
            Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isUpdateModalOpen && selectedTodo && (
        <div className="modal-overlay">
          <div className={`modal-content ${dropdownThemeClass}`}>
            <h3 className="text-lg font-semibold mb-4">Update Todo</h3>
            <form onSubmit={handleSubmit(handleUpdateSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
  {...register("title")}
  placeholder="New title"
  className="border p-2 rounded-lg w-full"
  style={{
    backgroundColor: theme === 'black' ? '#333' : '#fff',  
    color: theme === 'black' ? '#fff' : '#000',  
    borderColor: theme === 'black' ? '#444' : '#ccc',  
  }}
/>

              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <input
                  {...register("description")}
                  className="border p-2 rounded-lg w-full"
                  style={{
                    backgroundColor: theme === 'black' ? '#333' : '#fff',  
                    color: theme === 'black' ? '#fff' : '#000', 
                    borderColor: theme === 'black' ? '#444' : '#ccc',  
                  }}
                  placeholder="New description"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn-primary px-4 py-2 rounded-md">Update</button>
                <button
                  type="button"
                  className="btn-secondary px-4 py-2 rounded-md"
                  onClick={() => setIsUpdateModalOpen(false)} 
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

}
