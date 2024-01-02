import axios from "axios";
import { renderTask } from "./renderTask";
export async function addTask(title: string , description:string) {
    const task: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      date: new Date()
    };
  
    try {
      const response = await axios.post("http://localhost:3000/tasks", task);
      const newTask = response.data;
      renderTask(newTask);
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }