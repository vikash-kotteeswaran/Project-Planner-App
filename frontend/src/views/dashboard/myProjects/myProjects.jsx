import React from 'react';
import './myProjects.css';

const MyProjects = () => {

    const projects = [
        {
            title: 'To Do App',
            admin: 'vikashk',
            desc: 'make a To Do App with react and redux',
            members: 'jinjoe, sidd, aniroot, rajku'
        },
        {
            title: 'Zoom Clone App',
            admin: 'vikashk',
            desc: 'make a Zoom Clone App with react and redux',
            members: 'jinjoe, sidd, aniroot, rajku'
        }
    ]

    const projectDivs = () => {
        let mainDiv = [];
        
        for (let project of projects){
            console.log(project, project.admin);
            mainDiv.push(
                <div className='project-card'>
                    <div className='project-title'>{project.title}</div>
                    <div className='project-admin'>{project.admin}</div>
                    <div className='project-desc'>{project.desc}</div>
                </div>
            );
        };

        return (<div className='projects-main-div'>{mainDiv}</div>);
    };

    return(
        <div className='my-projects-view'>
            <h1>My Projects</h1>
            {projectDivs()}
        </div>
    );
};

export default MyProjects;