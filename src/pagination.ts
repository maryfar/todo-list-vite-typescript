import axios from "axios";
import { renderTask } from "./renderTask";
const taskList = <HTMLUListElement> document.querySelector("#task-list");
let totalPages: number;
let pageNumber:number = 1;
let activePage: number = pageNumber; 
const paginationContainer = <HTMLDivElement>document.getElementById("paginationcontiner");
const nextBtn = <HTMLDivElement>document.getElementById("nextbtn");
const previousBtn = <HTMLDivElement>document.getElementById("previousbtn");

export async function getPagination(page: number = 1) {
    try {
        const response = await axios.get(`http://localhost:3000/tasks?_page=${page}&_limit=3`);
        totalPages = Math.ceil((response.headers["x-total-count"])/3);
        paginationButtonsRender(totalPages,page);
        const tasks = response.data;
      tasks.forEach((task: Task) => {
        renderTask(task);
    });
    if (totalPages>1) {
        nextBtn.style.display = "block";
        previousBtn.style.display = "block";
      }
    } catch (err) {
        console.error(err);
    }
}



function paginationButton(page:number , isActive = false){
    if(isActive){
    return `
    <p
       aria-current="page"
       class="curser-pointer inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600">
       ${page}
    </p>
    `;
    }
    return `
    <p
      class="curser-pointer inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500  hover:border-gray-300 hover:text-gray-700">
      ${page}
     </p>
    `;
  };
  
  export function paginationButtonsRender(totalPages:number , activePage:number){
    let html = '';
      for(let page = 1 ; page <= totalPages ; page++){
        html += paginationButton(page, activePage === page);
      }
    paginationContainer.innerHTML = html;
  };
  
    

  paginationContainer.addEventListener('click' , (ev : any) => {
   
    if (Number(ev.target.innerText) === activePage) return;
    taskList.innerHTML = ""; 
    getPagination(Number(ev.target.innerText));
  
  });
  
  previousBtn.addEventListener('click' ,() => {
    
    if(pageNumber>1){
      taskList.innerHTML = ""; 
      pageNumber--;
      getPagination(pageNumber);
    }
  });
  
  nextBtn.addEventListener('click' ,() => {
   
    if(pageNumber<totalPages){
      taskList.innerHTML = ""; 
      pageNumber ++;
      getPagination(pageNumber);
    }
  });
