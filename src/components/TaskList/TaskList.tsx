import React, { useCallback, useEffect, useState } from 'react';
import styles from './TaskList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTask,
    deleteTask,
    updateTask,
    setTasks,
} from '../../redux/taskSlice';
import { reducerGetTasks } from '../../redux/selectors';
import { ITask } from '@/types/task';
import TaskItem from '../TaskItem/TaskItem';
import TaskControl from '../TaskСontrol/TaskControl';
import TodoPagination from '../Pagination/Pagination';
import { axiosGetTask } from '../../api/task';

interface Props {}

const TaskList: React.FC<Props> = () => {
    const dispatch = useDispatch();
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

    useEffect(() => {
        const fetchTasksAndSetToStore = async () => {
            const data = await axiosGetTask();
            dispatch(setTasks(data));
        };

        fetchTasksAndSetToStore();
    }, []);
    const tasks = useSelector(reducerGetTasks);

    const handleAddTask = useCallback(
        async (task: ITask) => {
            try {
                dispatch(addTask(task));
            } catch (error) {
                console.log(error); // компонент ошибка, notification, popup ошибки
            }
        },
        [dispatch]
    );

    const handleDeleteTask = useCallback(
        async (id: number) => {
            try {
                dispatch(deleteTask(id));
            } catch (error) {
                console.log(error); // компонент ошибка, notification, popup ошибки
            }
        },
        [dispatch]
    );

    const handleUpdateTask = useCallback(
        async (task: ITask) => {
            try {
                dispatch(updateTask(task));
            } catch (error) {
                console.log('ошибка сервера при обновлении данных');
                console.log(error); // компонент ошибка, notification, popup ошибки
            }
        },
        [dispatch]
    );

    return (
        <main className={`style-reset flex col ${styles.main}`}>
            <h1>Task List</h1>
            <TaskControl addTask={handleAddTask} />
            <div className={`style-reset flex col ${styles.tasks}`}>
                {tasks?.slice(startIndex, endIndex + 1).map((task: ITask) => {
                    return (
                        <TaskItem
                            key={task.id}
                            task={task}
                            updateTask={handleUpdateTask}
                            deleteTask={handleDeleteTask}
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
