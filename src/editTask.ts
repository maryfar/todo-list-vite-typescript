import axios from "axios";


const taskModal = document.getElementById("task-modal") as HTMLElement;
const modalTitleInput = document.getElementById("modal-title") as HTMLInputElement;
const modalDescriptionInput = document.getElementById("modal-description") as HTMLTextAreaElement;
const modalSaveButton = document.getElementById("modal-save") as HTMLButtonElement;
const modalCloseButton = document.getElementById("modal-close") as HTMLButtonElement;
modalSaveButton.addEventListener("click", onSaveClick);
modalCloseButton.addEventListener("click", onCloseClick);
let index :number;



const serverUrl = "http://localhost:3000"; 
export async function updateTask(taskId: number, updatedData: { title: string, description: string }) {
  try {
    const response = await axios.patch(`${serverUrl}/tasks/${taskId}`, updatedData);
    const updatedTask = response.data;
    const tiSpan = document.getElementById(`ti-${taskId}`);
    const desSpan = document.getElementById(`des-${taskId}`);

    if (tiSpan && desSpan) {
      tiSpan.textContent = updatedTask.title;
      desSpan.textContent = updatedTask.description;
      console.log("o0000");
      ("ok")
    } else {
      console.log("Error: tiSpan or desSpan not found for taskId", taskId);
    }

    console.log("Updated Task:", updatedTask);
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

export function displayEditModal(taskId: number): void {
  if (taskId) {
    taskModal.classList.remove("hidden");
    taskModal.classList.add("flex");
    index = taskId; 
  }
}

function onSaveClick() {
  const editedTitle = modalTitleInput.value;
  const editedDescription = modalDescriptionInput.value;
  const updatedData = {
    title: editedTitle,
    description: editedDescription,
  };
  updateTask(index, updatedData)
    .then(() => {
      taskModal.classList.add("hidden");
    })
    .catch((error) => {
      console.error("Error updating task:", error);
    });
}

function onCloseClick() {
  taskModal.classList.add("hidden");
}