
import './style.css';
import { getPagination } from './pagination';
import { submitTask } from './submitTask';
import { filterTask } from './filterTask';


const taskList = <HTMLUListElement> document.querySelector("#task-list");
const taskForm = <HTMLFormElement> document.querySelector("#task-form");
taskForm.addEventListener("submit",submitTask);
taskList.innerHTML = ""; 
getPagination();

  const showAllButton = <HTMLButtonElement>document.getElementById("show-all");
  const showCompletedButton = <HTMLButtonElement>document.getElementById("show-completed");
  
  showAllButton.addEventListener("click", () => {
    taskList.innerHTML="";
    getPagination();
  });
  
  showCompletedButton.addEventListener("click",()=>{
    taskList.innerHTML="";
    filterTask();
  }); 


  



  