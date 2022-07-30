import React from 'react';
import './myProjects.css';
import { getUserProjects, clickedOnProject } from '../../../controllers/redux/myProjectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const MyProjects = () => {

    // const projects = [
    //     {
    //         title: 'To Do App',
    //         admin: 'vikashk',
    //         desc: 'make a To Do App with react and redux',
    //         members: 'jinjoe, sidd, aniroot, rajku'
    //     },
    //     {
    //         title: 'Zoom Clone App',
    //         admin: 'vikashk',
    //         desc: 'make a Zoom Clone App with react and redux',
    //         members: 'jinjoe, sidd, aniroot, rajku'
    //     }
    // ]

    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProjects({userId: userId}));
    }, [dispatch]);
    const myProject = useSelector(state => state.myProject);
    const projects = myProject.projects;

    const wordLimiter = (paragraph) => {
        // Colour of readmore should be gray... look onto that
        if(paragraph.length > 200) return paragraph.slice(0, 200) + '... read more';
        else return paragraph;
    }

    const projectDivs = () => {
        let mainDiv = [];

        if(projects[0] == null){
            mainDiv.push(
                <div className='no-project-exists'><span>no projects are currently here</span></div>
            );
        }
        
        for (let project of projects){
            console.log(project, project.admin);
            mainDiv.push(
                <div id={project.projectId} className='project-card' onClick={clickedOnProject({projectId: project.projectId})}>
                    <div className='project-title'>{project.title}</div>
                    <div className='project-admin'>{project.creator}</div>
                    <div className='project-desc'>{wordLimiter(project.description)}</div>
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