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

interface Props {}

const TaskList: React.FC<Props> = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

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
            // if (!task.id) return;
            await axiosPutTask(task);

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
            console.log('ошибка при обновлении данных');
            console.log(error); // компонент ошибка, notification, popup ошибки
        }
    }, []);

    return (
        <main className={`style-reset flex col ${styles.main}`}>
            <h1>Task List</h1>
            <TaskControl addTask={addTask} />
            <div className={`style-reset flex col ${styles.tasks}`}>
                {tasks?.map((task: ITask) => {
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
        </main>
    );
};

export default TaskList;
