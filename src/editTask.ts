import axios from "axios";

let updatedTask:Task ; 
export let index: number;
export async function editTask(taskId: number, title: string, description: string) {
  try {
    const response = await axios.patch(`http://localhost:3000/tasks/${taskId}`, { title, description });
    const updatedTask = response.data;
    console.log(updatedTask);
    const index =updatedTask.id;
    console.log(index);
    updatedTask.title = title;
    updatedTask.description = description;
    
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

export function displayEditModal(index: number): void {

  if (index) {
    taskModal.classList.remove("hidden");
     taskModal.classList.add("flex");
    modalTitleInput.value = String(updatedTask.title);
    modalDescriptionInput.value = String(updatedTask.description);
    
    

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
