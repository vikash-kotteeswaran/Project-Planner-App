import React from 'react';
import Sidebar from '../sidebar/sidebar';
import './projects.css';

const Projects = () => {
    
    return (
        <div className='main-div'>
            <Sidebar currentView={'projects'}/>
            <div className='projects-main'>
                <h1>Projects</h1>
            </div>
        </div>
    );
};

export default Projects;