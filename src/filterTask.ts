
import axios from "axios";
import { renderTask } from "./renderTask";

export async function filterTask() {
  try {
    const response = await axios.get("http://localhost:3000/tasks?completed=true");
    const tasks = response.data;
    tasks.forEach((task: Task) => {
      renderTask(task);
    });

  } catch (error) {
    console.error("Error fetching or rendering tasks:", error);
  }
}


