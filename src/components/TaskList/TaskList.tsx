import React, { useCallback, useEffect, useState } from 'react';
import styles from './TaskList.module.scss';
import {
    axiosDeleteTask,
    axiosGetTask,
    axiosPostTask,
    axiosPutTask,
} from '../../api/task';
import { ITask } from '@/types/task';
import TaskItem from '../TaskItem/TaskItem';
import TaskControl from '../TaskСontrol/TaskControl';
import TodoPagination from '../Pagination/Pagination';

interface Props {}

const TaskList: React.FC<Props> = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        const newStartIndex = (page - 1) * 10;
        const newEndIndex = newStartIndex + 9;
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
        setCurrentPage(page);
    };

    const getTasks = async () => {
        const data = await axiosGetTask();
        setTasks(data);
    };

    useEffect(() => {
        getTasks();
    }, []);

    const addTask = useCallback(async (task: ITask) => {
        try {
            const data = await axiosPostTask(task);
            setTasks((prev) => {
                return [data, ...prev];
            });
            console.log('data', data);
        } catch (error) {
            console.log(error); // компонент ошибка, notification, popup ошибки
        }
    }, []);

    const deleteTask = async (id: number) => {
        try {
            await axiosDeleteTask(id);
            setTasks((prev) => {
                return prev.filter((item) => item.id !== id);
            });
        } catch (error) {
            console.log(error); // компонент ошибка, notification, popup ошибки
        }
    };

    const updateTask = useCallback(async (task: ITask) => {
        try {
            await axiosPutTask(task); // ограничение на 200 id-ов.

            setTasks((prev) => {
                const index = prev.findIndex((elem) => elem.id === task.id);
                if (index !== -1) {
                    const copy = [...prev];
                    copy[index] = task;
                    return copy;
                }
                return prev;
            });
        } catch (error) {
            console.log('ошибка сервера при обновлении данных');
            console.log(error); // компонент ошибка, notification, popup ошибки
        }
    }, []);

    return (
        <main className={`style-reset flex col ${styles.main}`}>
            <h1>Task List</h1>
            <TaskControl addTask={addTask} />
            <div className={`style-reset flex col ${styles.tasks}`}>
                {tasks?.slice(startIndex, endIndex + 1).map((task: ITask) => {
                    return (
                        <TaskItem
                            key={task.id}
                            task={task}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    );
                })}
            </div>

            <TodoPagination
                totalPages={Math.ceil(tasks.length / 10)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </main>
    );
};

export default TaskList;
