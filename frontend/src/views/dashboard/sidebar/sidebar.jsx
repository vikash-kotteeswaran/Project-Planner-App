import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../controllers/redux/authSlice';
import { userLoggingOut } from '../../../controllers/redux/myProjectSlice';
import './sidebar.css'


const Sidebar = ({currentView}) => {

    const [view, setView] = useState(currentView);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onButton = (event) => {
        dispatch(userLoggingOut());
        dispatch(logOut());
        event.preventDefault();
        navigate('/login')
    }

    const optView = () => {
        if(view === 'my-projects' && currentView !== view){
            return <Navigate to='/myProjects' />;
        } else if(view === 'projects' && currentView !== view){
            return <Navigate to='/otherProjects' />;
        } else if(view === 'tasks' && currentView !== view){
            return <Navigate to='/otherTasks' />;
        } else if(view === 'stats' && currentView !== view){
            return <Navigate to='/stats' />;
        } else if(view === 'profile' && currentView !== view){
            return <Navigate to='/profile' />;
        } else if(view === 'settings' && currentView !== view){
            return <Navigate to='/settings' />;
        };
    };

    return (
        <div className='sidebar'>
            {/* select view divs */}
            <div className='sidebar-app-logo' id='app-logo'>
                <span className='sidebar-ops-icon'><i className='fa fa-tasks'></i></span>
                <span className='sidebar-ops'>Project Planner</span>
            </div>
            <div className='sidebar-view-ops' id='my-projects' onClick={() => {setView('my-projects')}}>
                <span className='sidebar-ops-icon'><i className="fa fa-folder"></i></span>
                <span className='sidebar-ops'>My Projects</span>
            </div>
            <div className='sidebar-view-ops' id='projects' onClick={() => {setView('projects')}}>
                <span className='sidebar-ops-icon'><i className='fa fa-archive'></i></span>
                <span className='sidebar-ops'>Projects</span>
            </div>
            <div className='sidebar-view-ops' id='tasks' onClick={() => {setView('tasks')}}>
                <span className='sidebar-ops-icon'><i className='fa fa-list-alt'></i></span>
                <span className='sidebar-ops'>Tasks</span>
            </div>
            <div className='sidebar-view-ops' id='stats' onClick={() => {setView('stats')}}>
                <span className='sidebar-ops-icon'><i className='fa fa-pie-chart'></i></span>
                <span className='sidebar-ops'>Stats</span>
            </div>
            <div className='sidebar-view-ops' id='profile' onClick={() => {setView('profile')}}>
                <span className='sidebar-ops-icon'><i className='fa fa-user'></i></span>
                <span className='sidebar-ops'>Profile</span>
            </div>
            <div className='sidebar-view-ops' id='settings' onClick={() => {setView('settings')}}>
                <span className='sidebar-ops-icon'><i className='fa fa-gear'></i></span>
                <span className='sidebar-ops'>Settings</span>
            </div>
            <div className='sidebar-view-ops' id='logout' onClick={onButton}>
                <span className='sidebar-ops-icon'><i className='fa fa-sign-out'></i></span>
                <span className='sidebar-ops'>Logout</span>
            </div>

            {optView()}
        </div>
    );
};

export default Sidebar;