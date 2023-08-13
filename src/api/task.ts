import { ITask } from '@/types/task';
import axios from 'axios';

const BACKEND_URL = 'https://jsonplaceholder.typicode.com/todos/'; // 'https://jsonplaceholder.typicode.com/todos'

export async function axiosGetTask(): Promise<ITask[]> {
    const data = await axios({
        method: 'get',
        url: BACKEND_URL,
        responseType: 'json',
    });

    return data.data;
}

export async function axiosPostTask(task: ITask): Promise<ITask> {
    const data = await axios({
        method: 'post',
        url: BACKEND_URL,
        responseType: 'json',
        data: task,
    });

    return data.data;
}

export async function axiosDeleteTask(id: number): Promise<ITask> {
    const data = await axios({
        method: 'delete',
        url: BACKEND_URL + id,
        responseType: 'json',
    });

    return data.data;
}

export async function axiosPutTask(task: ITask): Promise<ITask> {
    const data = await axios({
        method: 'put',
        url: BACKEND_URL + task.id,
        responseType: 'json',
        data: task,
    });

    return data.data;
}
