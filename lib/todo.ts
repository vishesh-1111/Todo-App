import task from '../models/task'; 
import MongoConnect from '../database/mongodb'
MongoConnect();
export async function getTodos() {
  try {
    const todos = await task.find({}).lean();
    return { todos };
  } catch (error) {
    return { error };
  }
}


export async function createTodo(title: string, description: string, dueDate: Date) {
  try {
    const newTask = new task({ title, description, dueDate });
    const savedTask = await newTask.save();
    return { todo: savedTask };
  } catch (error) {
    return { error };
  }
}

export async function updateTodoStatus(id: string, done: boolean) {
  console.log(id,done);
  try {
    const old =await task.findById(id);
    console.log('old',old);
    const updatedTask = await task.findByIdAndUpdate(
      id,
      { done:done},
      { new: true } 
    );

    console.log(updatedTask)
    return { todo: updatedTask };
  } catch (error) {
    return { error };
  }
}

export async function deleteTodoById(id: string) {
  try {
    const deletedTask = await task.findByIdAndDelete(id);
    return { todo: deletedTask };
  } catch (error) {
    return { error };
  }
}

export async function updateTodo(id: string, updates:any) {
  try {
    const updatedTask = await task.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true } 
    );
    return { todo: updatedTask };
  } catch (error) {
    return { error };
  }
}