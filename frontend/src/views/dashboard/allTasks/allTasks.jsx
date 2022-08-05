import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, searchTasks } from '../../../controllers/redux/allTaskSlice';
import Sidebar from '../sidebar/sidebar';
import './allTasks.css';

const AllTasks = () => {

    const pageCount = 15;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [startingTask, setStartingTask] = useState(0);
    const [searchText, setSearchText] = useState({
        value: '',
        field: 'id',
        start: startingTask,
        count: pageCount
    });

    useEffect(() => {
        dispatch(searchTasks(searchText));
    }, [startingTask, dispatch]);

    const tasks = useSelector(state => state.allTasks);
    const projectIds = useSelector(state => state.myProject.projects.map(project => project.projectId));

    const gotoTask = (event) => {
        const id = event.currentTarget.id;
        const task = tasks.allTasks.filter(task => task.taskId == id)[0]
        let projectRole = 'nothing';

        if(projectIds.find(id => id == task.projectId)) projectRole = 'admin';

        navigate(`/task/${id}`, {state:{task: task, projectRole: projectRole}});
    }

    const allTasksTable = () => {
        const allTasksRows = [];

        for(let task of tasks.allTasks) {
            allTasksRows.push(
                <div className='all-tasks-table-row' id={task.taskId} onClick={gotoTask}>
                    <div className='all-tasks-table-row-taskId all-tasks-table-row-element'>{task.taskId}</div>
                    <div className='all-tasks-table-row-title all-tasks-table-row-element'>{task.title}</div>
                    <div className='all-tasks-table-row-status all-tasks-table-row-element'>{task.status}</div>
                    <div className='all-tasks-table-row-creator all-tasks-table-row-element'>{task.creatorName}</div>
                    <div className='all-tasks-table-row-assigned all-tasks-table-row-element'>{task.userAssignedName}</div>
                    <div className='all-tasks-table-row-createdDate all-tasks-table-row-element'>{task.createdDate.slice(0, -5).replace('T', ' at ')}</div>
                </div>
            );
        };

        return (
            <div className='all-tasks-table'>
                <div className='all-tasks-table-head'>
                    <div className='all-tasks-table-head-taskId all-tasks-table-head-element'>Id</div>
                    <div className='all-tasks-table-head-title all-tasks-table-head-element'>Title</div>
                    <div className='all-tasks-table-head-status all-tasks-table-head-element'>Status</div>
                    <div className='all-tasks-table-head-creator all-tasks-table-head-element'>Creator</div>
                    <div className='all-tasks-table-head-assigned all-tasks-table-head-element'>Assigned User</div>
                    <div className='all-tasks-table-head-createdDate all-tasks-table-head-element'>Created Date</div>
                </div>
                {allTasksRows}
            </div>
        );
    };


    const handleValueChange = (event) => {
        event.preventDefault();
        setSearchText({
            ...searchText,
            value: event.target.value
        });
    }

    const handleFieldChange = (event) => {
        event.preventDefault();
        setSearchText({
            ...searchText,
            field: event.target.value
        });
    }

    const handlePrevPage = async () => {
        // if(startingTask < pageCount) {
        //     await setStartingTask(0);
        //     await setSearchText({
        //         ...searchText,
        //         start: startingTask
        //     });
        // } else {
        //     await setStartingTask(startingTask-pageCount);
        //     await setSearchText({
        //         ...searchText,
        //         start: startingTask
        //     });
        // }
        // console.log('prev', startingTask);
        // await dispatch(searchTasks(searchText));
    }

    const handleNextPage = async () => {
        // await setStartingTask(startingTask + pageCount);
        // await setSearchText({
        //     ...searchText,
        //     start: startingTask
        // });
        // console.log('next', startingTask);
        // await dispatch(searchTasks(searchText));
    }

    const submitSearch = (event) => {
        event.preventDefault();
        console.log(searchText);
        dispatch(searchTasks(searchText));
    }

    return (
        <div className='main-div'>
            <Sidebar currentView={'tasks'}/>
            <div className='all-tasks-header'><h1>ALL TASKS</h1></div>
            <div className='all-tasks-main'>
                <div className='all-task-search-element'>
                    <input className='all-task-search-bar' placeholder='search by name' value={searchText.value} onChange={handleValueChange}></input>
                    <select className='all-task-select-search-field' value={searchText.field} onChange={handleFieldChange}>
                        <option className='all-task-select-search-field-option' value={'id'}>Id</option>
                        <option className='all-task-select-search-field-option' value={'title'}>Title</option>
                        <option className='all-task-select-search-field-option' value={'status'}>Status</option>
                        <option className='all-task-select-search-field-option' value={'admin'}>Creator</option>
                        <option className='all-task-select-search-field-option' value={'userAssignedName'}>Assigned User</option>
                        <option className='all-task-select-search-field-option' value={'createdDate'}>Created Date</option>
                    </select>
                    <button className='all-task-search-button' onClick={submitSearch}>Search</button>
                </div>
                {allTasksTable()}
            </div>
            <div className='all-task-change-page'>
                <div className='all-task-prev-page all-task-page-changer' onClick={handlePrevPage}><i class="fa fa-chevron-circle-left"></i></div>
                <div className='all-task-next-page all-task-page-changer' onClick={handleNextPage}><i class="fa fa-chevron-circle-right"></i></div>
            </div>
        </div>
    );
};

export default AllTasks;