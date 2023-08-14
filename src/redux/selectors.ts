import { RootState } from './rootReducer';

export const reducerGetTasks = (state: RootState) => state.task.tasks;
