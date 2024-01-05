import axios from "axios";

export async function deleteTask(taskId: number) {
  try {
    showConfirmDialog(); 
    const confirmDeleteButton = document.getElementById("confirm-delete") as HTMLButtonElement;
    const cancelDeleteButton = document.getElementById("cancel-delete") as HTMLButtonElement;
    confirmDeleteButton.addEventListener("click", async () => {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      const taskItem = document.querySelector(`li[data-id='${taskId}']`);
      if (taskItem) {
        taskItem.remove();
      }
      closeModal(); 
    });

    cancelDeleteButton.addEventListener("click", () => {
      console.log("Deletion canceled.");
      closeModal(); 
    });
  } catch (error) {
    console.error(error);
    closeModal(); 
  }
}

function showConfirmDialog(): void {
  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("id", "custom-modal");
  modalContainer.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "items-center", "justify-center", "z-50");
  modalContainer.innerHTML = `
      <div class="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
      <div class="modal-container bg-white w-1/2 md:max-w-md mx-auto rounded shadow-lg  overflow-y-auto z-50 p-2">
        <div class="modal-content flex flex-col gap-2 p-2">
          <p>Are you sure you want to delete this task?</p>
          <div class="text-right flex">
            <button id="confirm-delete" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Delete</button>
            <button id="cancel-delete" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline-gray active:bg-gray-800">Cancel</button>
          </div>
        </div>
      </div>`;

  document.body.appendChild(modalContainer);
}


function closeModal(): void {
  const modal = document.getElementById("custom-modal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
}
