import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '@/types/task';

interface TaskState {
    tasks: ITask[];
}

const initialState: TaskState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.unshift(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(
                (item) => item.id !== action.payload
            );
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            const index = state.tasks.findIndex(
                (elem) => elem.id === action.payload.id
            );
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        setTasks: (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload;
        },
    },
});

export const { addTask, deleteTask, updateTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
