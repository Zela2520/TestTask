import React from 'react';
import { ITask } from '@/types/task';

interface Props {
    task: ITask;
    updateTask: (task: ITask) => void;
    deleteTask: (id: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, updateTask, deleteTask }) => {
    return (
        <div key={task.id} className="flex">
            <input
                type="checkbox"
                value={`${task.completed}`}
                onChange={() => {
                    updateTask({
                        ...task,
                        completed: !task.completed,
                    });
                }}
            />
            <span>{task.title}</span>
            <button
                onClick={() => {
                    deleteTask(task.id);
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default TaskItem;
