
import './style.css';
import { submitTask } from './submitTask';
import { getData, renderData } from './getData';


const taskList = <HTMLUListElement>document.querySelector("#task-list");
const taskForm = <HTMLFormElement>document.querySelector("#task-form");
taskForm.addEventListener("submit", submitTask);
taskList.innerHTML = "";


const showAllButton = <HTMLButtonElement>document.getElementById("show-all");
const showCompletedButton = <HTMLButtonElement>document.getElementById("show-completed");


showAllButton.addEventListener("click", () => {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.delete('completed');
  window.location.href = newUrl.href;

});

showCompletedButton.addEventListener("click", () => {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('completed', 'true');
  window.location.href = newUrl.href;
});

const paginationContainer = <HTMLDivElement>document.getElementById("paginationcontiner");
paginationContainer.addEventListener('click', (ev) => {
  const newUrl = new URL(window.location.href);
  /* @ts-ignore */
  newUrl.searchParams.set('_page', ev.target.innerText);
  window.location.href = newUrl.href;
});


const currentUrl = new URL(window.location.href);
getData(
  currentUrl.searchParams.has('_page') ? +(currentUrl.searchParams.get('_page') as `${number}`) : 1,
  currentUrl.searchParams.has('_limit') ? +(currentUrl.searchParams.get('_limit') as `${number}`) : 2,
  currentUrl.searchParams.get('completed') === 'true',
).then(renderData);



