import axios from "axios";
import { renderTask } from "./renderTask";

type Resp = {
    data: Task[],
    currentPage: number,
    totalPages: number,
}

export async function getData(page: number, limit: number, isComplete: boolean): Promise<Resp> {
    const searchParams = new URLSearchParams();
    searchParams.set('_page', page.toString());
    searchParams.set('_limit', limit.toString());
    if (isComplete) {
        searchParams.set('completed', 'true');
    }

    const response = await axios.get(`http://localhost:3000/tasks?${searchParams.toString()}`);
    return {
        data: response.data as Task[],
        currentPage: page,
        totalPages: Math.ceil(+(response.headers["x-total-count"]) / 2),
    }
}


export function renderData(resp: Resp) {
    resp.data.forEach((task) => {
        // debugger;
        renderTask(task);
    });

    const paginationContainer = document.querySelector<HTMLDivElement>('#paginationcontiner');
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= resp.totalPages; i++) {
        paginationContainer.innerHTML += `
            <span
            aria-current="page"
            class="curser-pointer inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-indigo-600 ${i === resp.currentPage ? 'border-indigo-500' : 'border-transparent'}">
            ${i}
            </span>
        `;
    }
}