import axios from "axios";
import { renderTask } from "./renderTask";
export async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      const tasks = response.data;
      tasks.forEach((task: Task) => {
        renderTask(task);
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  
  