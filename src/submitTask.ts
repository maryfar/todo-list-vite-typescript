import { addTask } from "./addTask";
const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const taskDescription = document.querySelector("#task-description") as HTMLInputElement;
export const submitTask = async (e:any) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    const description = taskDescription.value.trim();
    if (title !== "" && description !== "") {
      try {
        await addTask(title, description); 
        taskInput.value = "";
      } catch (error) {
        console.error(error);
      }
    }
    
  }

  