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
                <div className='sidebar-view-ops' id='my-projects'>
                    <span className='sidebar-ops' onClick={() => {setView('my-projects')}}>My Projects</span>
                    <span className='sidebar-ops-icon'>M</span>
                </div>
                <div className='sidebar-view-ops' id='projects'>
                    <span className='sidebar-ops' onClick={() => {setView('projects')}}>Projects</span>
                    <span className='sidebar-ops-icon'>P</span>
                </div>
                <div className='sidebar-view-ops' id='tasks'>
                    <span className='sidebar-ops' onClick={() => {setView('tasks')}}>Tasks</span>
                    <span className='sidebar-ops-icon'>T</span>
                </div>
                <div className='sidebar-view-ops' id='stats'>
                    <span className='sidebar-ops' onClick={() => {setView('stats')}}>Stats</span>
                    <span className='sidebar-ops-icon'>S</span>
                </div>
                <div className='sidebar-view-ops' id='profile'>
                    <span className='sidebar-ops' onClick={() => {setView('profile')}}>Profile</span>
                    <span className='sidebar-ops-icon'>P</span>
                </div>
                <div className='sidebar-view-ops' id='settings'>
                    <span className='sidebar-ops' onClick={() => {setView('settings')}}>Settings</span>
                    <span className='sidebar-ops-icon'>S</span>
                </div>
                <div className='sidebar-view-ops' id='logout'>
                    <span className='sidebar-ops' onClick={onButton}>Logout</span>
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