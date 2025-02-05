'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { createTodoAction } from "@/app/_action"
import { useState } from "react";
const todoFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  date: z.string().min(1, { message: "Date is required" }), 
})

type TodoFormValues = z.infer<typeof todoFormSchema>

const defaultValues: Partial<TodoFormValues> = {
  title: "",
  description: "",
  date: "",
}

export function TodoForm() {
  const { toast } = useToast()
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
  })
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: TodoFormValues) {
    setIsLoading(true);
    const { title, description, date } = data
    if (!title || !date||!description) return
    const dateObject = new Date(date)
    await createTodoAction( title, description, dateObject ) 
    setIsLoading(false);


    toast({
      title: "Your todo has been created.",
    })

    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <Button type="submit" disabled={isLoading} className="w-full flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span>Submitting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>

      </form>

    </Form>
  )
}
