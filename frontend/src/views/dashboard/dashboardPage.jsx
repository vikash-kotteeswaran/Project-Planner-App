import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../controllers/redux/authSlice';
import MyProjects from './myProjects/myProjects';
import './dashboardPage.css';

const DashboardPage = () => {

    const [view, setView] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onButton = (event) => {
        dispatch(logOut());
        event.preventDefault();
        navigate('/login')
    }

    const optView = () => {
        if(view === 'my-projects'){
            return (<MyProjects />);
        } else if(view === 'projects'){
            return (<></>)
        } else if(view === 'tasks'){
            return (<></>)
        } else if(view === 'stats'){
            return (<></>)
        } else if(view === 'profile'){
            return (<></>)
        } else if(view === 'settings'){
            return (<></>)
        };
    };


    return (
        <div className='dashboard'>
            <div className='sidebar'>
                <div className='sidebar-view-ops' id='my-projects' onClick={() => {setView('my-projects')}}>
                    <span className='sidebar-ops'>My Projects</span>
                    <span className='sidebar-ops-icon'>M</span>
                </div>
                <div className='sidebar-view-ops' id='projects' onClick={() => {setView('projects')}}>
                    <span className='sidebar-ops'>Projects</span>
                    <span className='sidebar-ops-icon'>P</span>
                </div>
                <div className='sidebar-view-ops' id='tasks' onClick={() => {setView('tasks')}}>
                    <span className='sidebar-ops'>Tasks</span>
                    <span className='sidebar-ops-icon'>T</span>
                </div>
                <div className='sidebar-view-ops' id='stats' onClick={() => {setView('stats')}}>
                    <span className='sidebar-ops'>Stats</span>
                    <span className='sidebar-ops-icon'>S</span>
                </div>
                <div className='sidebar-view-ops' id='profile' onClick={() => {setView('profile')}}>
                    <span className='sidebar-ops'>Profile</span>
                    <span className='sidebar-ops-icon'>P</span>
                </div>
                <div className='sidebar-view-ops' id='settings' onClick={() => {setView('settings')}}>
                    <span className='sidebar-ops'>Settings</span>
                    <span className='sidebar-ops-icon'>S</span>
                </div>
                <div className='sidebar-view-ops' id='logout' onClick={onButton}>
                    <span className='sidebar-ops'>Logout</span>
                    <span className='sidebar-ops-icon'>L</span>
                </div>
            </div>
            <div className='main-view'>
                {optView()}
            </div>
            {/* <button type='submit' onClick={onButton}>LogOut</button> */}
        </div>
    );
};

export default DashboardPage;