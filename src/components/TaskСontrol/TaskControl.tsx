import React, { useState } from 'react';
import styles from './TaskControl.module.scss';
import styled from 'styled-components';
import { ITask } from '@/types/task';

const AddTaskButton = styled.button`
    background-color: #f50057;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #d5004e;
    }
`;

const TaskInput = styled.input`
    /* Ваши стили для input */
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 1rem;
`;

interface Props {
    addTask: (task: ITask) => void;
}

const TaskControl: React.FC<Props> = ({ addTask }) => {
    const [taskInput, setTaskInput] = useState('');

    const handleAddTask = () => {
        if (taskInput) {
            addTask({
                title: taskInput,
                completed: false,
            });
            setTaskInput('');
        }
    };

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className={styles.task__control}>
            <AddTaskButton
                className={styles.task__control__button}
                onClick={handleAddTask}
            >
                Add task
            </AddTaskButton>
            <TaskInput
                className={styles.task__control__input}
                type="text"
                placeholder="Enter task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default TaskControl;
