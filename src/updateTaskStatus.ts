import axios from "axios";
export async function updateTaskStatus(taskId: number, completed: boolean) {
    try {
      await axios.patch(`http://localhost:3000/tasks/${taskId}`, { completed });
    } catch (error) {
      console.error(error);
    }
  }