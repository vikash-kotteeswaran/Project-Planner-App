import React from 'react';
import { getUserProjects, getProjectTasks, addNewProject, getProjectMembers, eraseStates, eraseProjectStates } from '../../../controllers/redux/myProjectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './myProjects.css';

const MyProjects = () => {

    const userId = useSelector(state => state.auth.userId);
    const userName = useSelector(state => state.auth.userName);
    const myProject = useSelector(state => state.myProject);

    const [projectId, setProjectId] = useState('^');
    const [newProjectWindow, setNewProjectWindow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserProjects({userId: userId}));
        dispatch(eraseProjectStates());
    }, [dispatch]);

    // const projects = myProject.projects;

    const wordLimiter = (paragraph) => {
        // Colour of readmore should be gray... look onto that
        const windowLimit = 150;
        if(paragraph.length > windowLimit) return <span>{paragraph.slice(0, windowLimit).trim()}<span className='read-more'>... readmore</span></span>;
        else return <span>{paragraph}</span>;
    }

    const openNewProject = () => {
        setNewProjectWindow(true);
    }

    // useEffect(() => {
    //     // console.log('projectId', projectId);
    //     if(projectId != '^') {
    //         dispatch(getProjectTasks({projectId: projectId}));
    //         dispatch(getProjectMembers({projectId: projectId}));
    //     }
    // }, [projectId, myProject.taskChange, dispatch])

    useEffect(() => {
        const project = myProject.projects.filter(project => project.projectId == projectId)[0];

        if(projectId != '^') navigate(`/project/${projectId}`, {state: {project: project, userId: userId}});
    }, [projectId, navigate])

    const projectDivs = () => {

        const onProjectClick = (event) => {
            setProjectId(event.currentTarget.id);
        }

        let mainDiv = [];

        if(myProject.projects[0] == null){
            mainDiv.push(
                <div className='no-project-exists'><span>No projects are currently here</span></div>
            );
        }
        
        for (let project of myProject.projects){
            mainDiv.push(
                <div id={project.projectId} className='project-card' onClick={onProjectClick}>
                    <div className='project-title'>{project.title}</div>
                    <div className='project-desc'>{wordLimiter(project.description)}</div>
                    <div className='project-card-extra'>
                        <div className='project-admin'>{project.creator}</div>
                        <div className={`project-progress project-progress-${project.status.toLowerCase().replaceAll(' ', '-')}`}>{project.status}</div>
                    </div>
                </div>
            );
        };

        return (
            <div className='my-projects-main'>
                <div className='my-projects-header'>
                    <h1>My Projects</h1>
                    <div className='add-project' onClick={openNewProject}><i className="fa fa-plus"></i></div>
                </div>
                <div className='projects'>
                    {mainDiv}
                </div>
            </div>
        );
    };

    const [newProjectInput, setNewProjectInput] = useState({
        title: '',
        description: '',
        status: 'None',
        userId: userId,
        admin: userName
    })

    const newProject = () => {

        const handleStatusChange = (event) => {
            setNewProjectInput({
                ... newProjectInput,
                status: event.target.value
            })
            event.preventDefault();
        }

        const handleTitleChange = (event) =>{
            setNewProjectInput({
                ... newProjectInput,
                title: event.target.value
            })
            event.preventDefault();
        }

        const handleDescChange = (event) =>{
            setNewProjectInput({
                ... newProjectInput,
                description: event.target.value
            })
            event.preventDefault();
        }

        const OnNewProjectSubmit = async (event) => {
            // https://stackoverflow.com/questions/37146302/event-preventdefault-in-async-functions
            event.preventDefault();
            let add = true;
            if(newProjectInput.title.length < 5 ) {
                add = false;
                const titleError = ' title-error'
                document.querySelector('input.new-project-title').className += titleError;
                console.log(document.querySelector('input.new-project-title').className);

                setTimeout(() => {
                    document.querySelector('input.new-project-title').className = 'new-project-title';
                    console.log(document.querySelector('input.new-project-title').className);
                }, 5000)
            }

            if(newProjectInput.status == 'None'){
                add = false;
                const statusError = ' status-error'
                document.querySelector('span.status-selector-span').className += statusError;
                document.querySelector('select.new-project-status').className += statusError;
                console.log(document.querySelector('span.new-project-status-selector-span').className);

                setTimeout(() => {
                    document.querySelector('span.project-status-selector-span').className = 'project-status-selector-span';
                    document.querySelector('select.new-project-status').className = 'new-project-status';
                    console.log(document.querySelector('span.project-status-selector-span').className);
                }, 5000)
            }

            if(add) {
                await dispatch(addNewProject(newProjectInput));
                setNewProjectInput({
                    title: '',
                    description: '',
                    status: 'None',
                    userId: userId,
                    admin: userName
                });
                setNewProjectWindow(false);
                window.location.reload();
            }
        }

        return (
            <div className='new-project'>
                <form className='new-project-form'>
                    <div className='cancel-adding-project' onClick={() => setNewProjectWindow(false)}><i className='fa fa-times'></i></div>
                    <input name='title' className='new-project-title' placeholder='Project Title' onChange={handleTitleChange}></input>
                    <textarea name='description' className='new-project-description' placeholder='Project Description' onChange={handleDescChange}></textarea>

                    <div className='new-project-status-selector'>
                        <span className='new-project-status-selector-span'>Project Status</span>
                        <select name="status" className='new-project-status' value={newProjectInput.status} onChange={handleStatusChange}>
                            <option className='in-progress-option' value='None'>None</option>
                            <option className='in-progress-option' value='In progress'>In Progress</option>
                            <option className='to-be-done-option' value='To be done'>To Be Done</option>
                        </select>
                    </div>

                    <button className='submit-project-details' type='submit' onClick={OnNewProjectSubmit}>SUBMIT</button>
                </form>
            </div>
        );
    };

    return(
        <div className='main-div'>
            {newProjectWindow? newProject() : <></>}
            <Sidebar currentView={'my-projects'}/>
            {projectDivs()}
        </div>
    );
};

export default MyProjects;