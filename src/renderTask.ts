
import {updateTaskStatus} from "./updateTaskStatus.js";
import { deleteTask } from "./deleteTask.js";
const taskList = document.querySelector("#task-list") as HTMLUListElement;
export function renderTask(task: Task) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("rounded-md","p-2","bg-red-100","flex","flex-col","w-full")
    taskItem.innerHTML = `
    <div>
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span>${task.title}</span>
      </div>
      <span>${task.description}</span>
      <span>created at: ${task.date.toLocaleString()}</span>
      <button class="delete-btn rounded-md bg-red-500 text-white p-2">Delete</button>
    `;
  
    const checkbox = taskItem.querySelector("input[type='checkbox']") as HTMLInputElement;
    const deleteBtn = taskItem.querySelector(".delete-btn") as HTMLButtonElement;
  
    checkbox.addEventListener("change", () => {
      updateTaskStatus(task.id, checkbox.checked);
    });
  
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });
  
    taskItem.setAttribute("data-id", task.id.toString()); 
    taskList.appendChild(taskItem);
  }