import { combineReducers } from 'redux';
import taskReducer from './taskSlice';

export const rootReducer = combineReducers({
    task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
