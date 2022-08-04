import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteTask } from '../../../controllers/redux/myProjectSlice';
import Sidebar from '../sidebar/sidebar';
import './taskTab.css';


const TaskTab = () => {

    const {state} = useLocation()
    const {task, projectRole} = state;

    const dispatch = useDispatch();

    const [deleteTaskWindow, setDeleteTaskWindow] = useState(false);

    const confirmDeleteTask = () => {
        return (
            <div className='confirm-delete-task'>
                <div className='confirm-delete-task-box'>
                    <span>Are you sure?</span>
                    <div className='confirmation-on-delete-task'>
                        <button className='delete-task-for-sure' onClick={deleteCurrentTask}>Delete</button>
                        <button className='cancel-delete-task' onClick={() => setDeleteTaskWindow(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    const deleteCurrentTask = async () => {
        await dispatch(deleteTask({taskId: task.taskId}));
        window.history.go(-1);
    }

    const onDeleteTask = () => {
        setDeleteTaskWindow(true);
    }

    return (
        <div className='task-view'>
            {deleteTaskWindow? confirmDeleteTask() : <></>}
            <Sidebar />
            <div className='task-main'>
                <div className='task-overview'>
                    <div className='task-title'>
                        <span>{task.title}</span>
                        {projectRole == 'admin'? <div className='delete-task' onClick={onDeleteTask}><i className="fa fa-trash"></i></div> : <></>}
                    </div>
                    <div className='task-contribs'>
                        <div className='task-admin'><span>{task.creatorName}</span></div>
                        {task.userAssignedName? <div className='task-assigned-to'><span>{task.userAssignedName}</span></div> : <></>}
                    </div>
                    <div className='task-description'><span>{task.description}</span></div>
                </div>

                <div className='task-comments'></div>
            </div>
        </div>
    );
}

export default TaskTab;