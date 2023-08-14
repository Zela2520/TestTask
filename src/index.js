import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/TaskList/TaskList.tsx';
import { Provider } from 'react-redux';
import './index.scss';
import { store } from './redux/store.ts';

ReactDOM.render(
    <Provider store={store}>
        <div className="app flex col">
            <TaskList />
        </div>
    </Provider>,
    document.getElementById('root')
);
