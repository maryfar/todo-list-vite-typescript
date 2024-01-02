import axios from "axios";
export async function deleteTask(taskId: number) {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      const taskItem = document.querySelector(`li[data-id='${taskId}']`);
      if (taskItem) {
        taskItem.remove();
      }
    } catch (error) {
      console.error(error);
    }
  }