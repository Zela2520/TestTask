import React, { useState } from 'react';
import { ITask } from '@/types/task';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import styles from './TaskItem.module.scss';

const StyledTaskItem = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
});

const CheckBoxStyledLoader = styled(CircularProgress)({
    position: 'absolute',
    left: '30px',
    top: '22%',
});

const ButtonStyledLoader = styled(CircularProgress)({
    marginLeft: '0.2rem',
});

interface Props {
    task: ITask;
    updateTask: (task: ITask) => void;
    deleteTask: (id: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, updateTask, deleteTask }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDeleteTask = async () => {
        setIsLoading(true);
        if (task.id) {
            await deleteTask(task.id);
            setIsLoading(false);
        } else {
            // если мы создаем задачу, то id нашей задачи не сохраняется сервером, поэтому при удалении созданной нами задачи попадем сюда
            console.log('задача не может быть удалена. Отсутвует id'); // TODO: компонент ошибка, форму
        }
    };

    return (
        <StyledTaskItem>
            <div className={styles.position__relative}>
                <Checkbox
                    className={styles.tasks__item__checkbox}
                    checked={task.completed}
                    onChange={() => {
                        setIsUpdating(true);
                        new Promise((r) => {
                            r(
                                updateTask({
                                    ...task,
                                    completed: !task.completed,
                                })
                            );
                        })
                            .then(() => {
                                setIsUpdating(false);
                            })
                            .catch(() => {
                                setIsUpdating(false);
                            });
                    }}
                    disabled={isUpdating}
                />
                {isUpdating && <CheckBoxStyledLoader size={20} />}
            </div>
            <span className={`${styles.tasks__item__title}`}>{task.title}</span>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleDeleteTask}
                disabled={isLoading}
            >
                {isLoading ? <ButtonStyledLoader size={20} /> : 'Delete'}
            </Button>
        </StyledTaskItem>
    );
};

export default TaskItem;
