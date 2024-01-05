
import axios from "axios";
import { renderTask } from "./renderTask";
import { getPagination } from './pagination';
import { paginationButtonsRender } from "./pagination";



const taskList = <HTMLUListElement> document.querySelector("#task-list");
const paginationContainer = <HTMLDivElement>document.getElementById("paginationcontiner");
const nextBtn = <HTMLDivElement>document.getElementById("nextbtn");
const previousBtn = <HTMLDivElement>document.getElementById("previousbtn");
let totalPages: number;
let pageNumber:number = 1;


export async function filterTask() {
  try {
    const response = await axios.get("http://localhost:3000/tasks?completed=true");
    const tasks = response.data;
    totalPages = Math.ceil((response.headers["x-total-count"])/3);
    paginationButtonsRender(totalPages,pageNumber);
    if (totalPages>= 1) {
      nextBtn.style.display = "block";
      previousBtn.style.display = "block";
    }
    tasks.forEach((task: Task) => {
      renderTask(task);
    });
    

  } catch (error) {
    console.error("Error fetching or rendering tasks:", error);
  }
}



  

paginationContainer.addEventListener('click' , (ev : any) => {
  taskList.innerHTML = ""; 
  getPagination(Number(ev.target.innerText));

});

previousBtn.addEventListener('click' ,() => {
  if(pageNumber>1){
    pageNumber--;
    taskList.innerHTML = ""; 
    getPagination(pageNumber);
  }
});

nextBtn.addEventListener('click' ,() => {
  if(pageNumber<totalPages){
    pageNumber ++;
    taskList.innerHTML = ""; 
    getPagination(pageNumber);
  }
});