import React from 'react';
import { getUserProjects, getProjectTasks } from '../../../controllers/redux/myProjectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './myProjects.css';

const MyProjects = () => {

    const userId = useSelector(state => state.auth.userId);
    const myProject = useSelector(state => state.myProject);

    const [projectId, setProjectId] = useState('^');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(myProject.projects.length == 0) dispatch(getUserProjects({userId: userId}));
    }, [userId, dispatch]);

    const projects = myProject.projects;

    const wordLimiter = (paragraph) => {
        // Colour of readmore should be gray... look onto that
        const windowLimit = 150;
        if(paragraph.length > windowLimit) return paragraph.slice(0, windowLimit) + '... read more';
        else return paragraph;
    }

    const onProjectClick = (event) => {
        setProjectId(event.currentTarget.id);
    }

    useEffect(() => {
        // console.log('projectId', projectId);
        if(projectId != '^') dispatch(getProjectTasks({projectId: projectId}));
    }, [projectId, dispatch])

    useEffect(() => {
        const project = projects.filter(project => project.projectId == projectId)[0];
        const tasks = myProject.tasks;
        const members = [];

        if(projectId != '^') navigate(`/project/${projectId}`, {state: {project: project, tasks: tasks, members: members}});
    }, [myProject.tasks, navigate])

    const projectDivs = () => {
        let mainDiv = [];

        if(projects[0] == null){
            mainDiv.push(
                <div className='no-project-exists'><span>no projects are currently here</span></div>
            );
        }
        
        for (let project of projects){
            mainDiv.push(
                <div id={project.projectId} className='project-card' onClick={onProjectClick}>
                    <div className='project-title'>{project.title}</div>
                    <div className='project-admin'>{project.creator}</div>
                    <div className='project-desc'>{wordLimiter(project.description)}</div>
                </div>
            );
        };

        return (
            <div className='my-projects-main'>
                <h1>My Projects</h1>
                <div className='projects'>
                    {mainDiv}
                </div>
            </div>
        );
    };

    return(
        <div className='main-div'>
            <Sidebar currentView={'my-projects'}/>
            {projectDivs()}
        </div>
    );
};

export default MyProjects;