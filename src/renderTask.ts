import './style.css';
import { updateTaskStatus } from "./updateTaskStatus.js";
import { deleteTask } from "./deleteTask.js";
import { displayEditModal } from "./editTask.js";
export let tispan:string;
export let desspan:string;
const taskList = document.querySelector("#task-list") as HTMLUListElement;
const modalTitleInput = document.getElementById("modal-title") as HTMLInputElement;
const modalDescriptionInput = document.getElementById("modal-description") as HTMLTextAreaElement;

export function renderTask(task: Task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add(
    "rounded-md",
    "p-4",
    "bg-task-item",
    "flex",
    "flex-col",
    "w-full",
    "border",
    "shadow-lg",
    "gap-2",
    "text-white",
    "md:w-1/2"
    
  );
  
  taskItem.innerHTML = `
    <div>
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span id="ti-${task.id}" class="font-bold">${task.title}</span>
    </div>
    <span id="des-${task.id}">${task.description}</span>
    <span>created at: ${task.date.toLocaleString()}</span>
    <div class="flex gap-2">
    <button class="delete-btn rounded-md  shadow-md  p-2 border ">Delete</button>
    <button class="edit-btn rounded-md   shadow-md  px-4 py-2 border">Edit</button>
    </div>
  `;

  const checkbox = taskItem.querySelector(
    "input[type='checkbox']"
  ) as HTMLInputElement;
  const deleteBtn = taskItem.querySelector(".delete-btn") as HTMLButtonElement;
  const editBtn = taskItem.querySelector(".edit-btn") as HTMLButtonElement;

  checkbox.addEventListener("change", () => {
    updateTaskStatus(task.id, checkbox.checked);
  });

  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
  });

  
  editBtn.addEventListener("click", () => {
    displayEditModal(task.id);
    console.log(task.id);
    modalTitleInput.value=task.title;
    modalDescriptionInput.value=task.description;
  });

  taskItem.setAttribute("data-id", task.id.toString());
  taskList.appendChild(taskItem);

}
