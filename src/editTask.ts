import axios from "axios";

let tasks: Task[] = []; 
let index: number = 0;
export async function editTask(taskId: number, title: string, description: string) {
  try {
    const response = await axios.patch(`http://localhost:3000/tasks/${taskId}`, { title, description });
    const updatedTask = response.data;
    const index =updatedTask.id;
    updatedTask.title = title;
    updatedTask.description = description;
    console.log(index);
    
  } catch (error) {
    console.error(error);
  }
}


const taskModal = document.getElementById("task-modal") as HTMLElement;
const modalTitleInput = document.getElementById("modal-title") as HTMLInputElement;
const modalDescriptionInput = document.getElementById("modal-description") as HTMLTextAreaElement;
const modalSaveButton = document.getElementById("modal-save") as HTMLButtonElement;
const modalCloseButton = document.getElementById("modal-close") as HTMLButtonElement;

modalSaveButton.addEventListener("click", onSaveClick);
modalCloseButton.addEventListener("click", onCloseClick);

export function displayEditModal(taskId: number): void {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    modalTitleInput.value = task.title;
    modalDescriptionInput.value = task.description;
    taskModal.classList.remove("hidden");
     taskModal.classList.add("flex");
    

  }
}

function onSaveClick() {
  const editedTitle = modalTitleInput.value;
  const editedDescription = modalDescriptionInput.value;
  editTask(index, editedTitle, editedDescription);
  taskModal.classList.add("hidden");
}

function onCloseClick() {
  taskModal.classList.add("hidden");
}
