import { combineReducers } from 'redux';
import taskReducer from './taskSlice';

const rootReducer = combineReducers({
    task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
