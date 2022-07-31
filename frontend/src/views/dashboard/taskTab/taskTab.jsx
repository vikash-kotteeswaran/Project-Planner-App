import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import './taskTab.css';


const TaskTab = () => {

    const {state} = useLocation()
    const {task} = state;

    return (
        <div className='task-view'>
            <Sidebar />
            <div className='task-main'>
                <div className='task-overview'>
                    <div className='task-title'><span>{task.title}</span></div>
                    <div className='task-creator'><span>{task.creator}</span></div>
                    <div className='task-description'><span>{task.description}</span></div>
                </div>

                <div className='task-comments'></div>
            </div>
        </div>
    );
}

export default TaskTab;