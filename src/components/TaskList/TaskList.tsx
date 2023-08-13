import React, { useCallback, useEffect, useState } from 'react';
import styles from './TaskList.module.scss';
import {
    axiosDeleteTask,
    axiosGetTask,
    axiosPostTask,
    axiosPutTask,
} from '../../api/task';
import { ITask } from '@/types/task';

const task: ITask = {
    "userId": 6,
    "id": 101,
    "title": `Do it, just do it! Don’t let your dreams be dreams. Yesterday you said tomorrow.
    So just do it! Make your dreams come true. Just do it. Some people dream of success,
    while you’re going to wake up and work hard at it. Nothing is impossible…
    You should get to the point where anyone else would quit and you’re not going to stop there.`,
    "completed": false
};
interface Props {}

const Main: React.FC<Props> = () => {
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
                return [...prev, data];
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
            console.log(error);
        }
    };

    const updateTask = useCallback(async (task: ITask) => {
        try {
            const data = await axiosPutTask(task);
            console.log('data put', data);

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
            console.log(error); // компонент ошибка, notification, popup ошибки
        }
    }, []);

    console.log('tasks', tasks);

    return (
        <main className={`style-reset flex col ${styles.main}`}>
            <button
                onClick={() => {
                    addTask(task);
                }}
            >
                Add task
            </button>
            {
                tasks?.map((task: ITask) => {
                    return (
                        <div key={task.id} className='flex'>
                            <input type="checkbox" value={`${task.completed}`} onChange={() => {
                                updateTask(
                                    {
                                        ...task, 
                                        completed: !task.completed
                                    });
                            }} />
                            <span>{task.title}</span>
                            <button
                                onClick={() => {
                                    deleteTask(task.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    )
                })
            }
            <section
                className={`flex container col align-items-center ${styles.left_bar}`}
            ></section>
        </main>
    );
};

export default Main;
