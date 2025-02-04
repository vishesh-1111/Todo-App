'use server'

import { createTodo, deleteTodoById, updateTodoStatus,updateTodo } from "@/lib/todo"
import { revalidatePath } from "next/cache"

export async function createTodoAction(title: string,description:string,dueDate:Date) {
  await createTodo(title,description,dueDate)
  revalidatePath("/")
}

export async function updateTodoStatusAction(id: string, done: boolean) {
  await updateTodoStatus(id, done)
  revalidatePath("/")
}

export async function deleteTodoAction(id: string) { 
  await deleteTodoById(id)
  revalidatePath("/")
}


export async function updateTodoAction(id: string,updates:any) { 
  await updateTodo(id,updates)
  revalidatePath("/")
}