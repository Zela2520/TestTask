import { RootState } from './rootReducer';

export const getTasks = (state: RootState) => state.task.tasks;
