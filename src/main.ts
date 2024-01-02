
import './style.css';
import { fetchTasks } from './fetchTasks';
import { submitTask } from './submitTask';
import { filterTask } from './filterTask';

const taskList = <HTMLUListElement> document.querySelector("#task-list");
const taskForm = <HTMLFormElement> document.querySelector("#task-form");
taskForm.addEventListener("submit",submitTask);
taskList.innerHTML = ""; 
  fetchTasks();

  const showAllButton = <HTMLButtonElement>document.getElementById("show-all");
  const showCompletedButton = <HTMLButtonElement>document.getElementById("show-completed");
  
  showAllButton.addEventListener("click", () => {
    taskList.innerHTML="";
    fetchTasks();
  });
  
  showCompletedButton.addEventListener("click",()=>{
    taskList.innerHTML="";
    filterTask();
  }); 



