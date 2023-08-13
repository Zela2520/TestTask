import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/TaskList/TaskList.tsx';
import './index.scss';

function App() {
    return (
        <div className="app flex col">
            <TaskList mainContent="MainContent" />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
