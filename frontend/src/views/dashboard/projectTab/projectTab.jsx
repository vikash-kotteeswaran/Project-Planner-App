import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import './projectTab.css';


const ProjectTab = () => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const {project, tasks, members} = state;

    const wordLimiter = (paragraph) => {
        // Colour of readmore should be gray... look onto that
        const windowLimit = 100;
        if(paragraph.length > windowLimit) return paragraph.slice(0, windowLimit) + '... read more';
        else return paragraph;
    }

    const onTaskClick = (event) => {
        const taskId = event.currentTarget.id;
        console.log('taskId', taskId);

        const task = tasks.filter(task => task.taskId == taskId)[0];

        navigate(`/task/${taskId}`, {state: {task: task}});
    }

    const tasksView = (tasks) => {
        const done = [];
        const inProgress = [];
        const toBeDone = [];

        for(const task of tasks) {
            switch(task.status.toLowerCase()) {
                case 'done':
                    done.push(
                        <div id={task.taskId} className='task' onClick={onTaskClick}>
                            <div className='task-title'><span>{task.title}</span></div>
                            <div className='task-creator'><span>{task.creator}</span></div>
                            <div className='task-assigned-to'><span>{task.userAssigned}</span></div>
                            <div className='task-description'><span>{wordLimiter(task.description)}</span></div>
                        </div>
                    );
                    break;
                
                case 'in progress':
                    inProgress.push(
                        <div id={task.taskId} className='task' onClick={onTaskClick}>
                            <div className='task-title'><span>{task.title}</span></div>
                            <div className='task-creator'><span>{task.creator}</span></div>
                            <div className='task-assigned-to'><span>{task.userAssigned}</span></div>
                            <div className='task-description'><span>{wordLimiter(task.description)}</span></div>
                        </div>
                    )
                    break;

                case 'to be done':
                    toBeDone.push(
                        <div id={task.taskId} className='task' onClick={onTaskClick}>
                            <div className='task-title'><span>{task.title}</span></div>
                            <div className='task-creator'><span>{task.creator}</span></div>
                            <div className='task-assigned-to'><span>{task.userAssigned}</span></div>
                            <div className='task-description'><span>{wordLimiter(task.description)}</span></div>
                        </div>
                    )
                    break;
                
                default:
                    console.log('Invalid status', task.taskId);
            }

            return (
                <div className='tasks'>
                    <div className='done'>{done}</div>
                    <div className='in-progress'>{inProgress}</div>
                    <div className='to-be-done'>{toBeDone}</div>
                </div>
            )
        }

    }

    return (
        <div className='project-view'>
            <Sidebar />
            <div className='project-main'>
                <div className='project-overview'>
                    <div className='project-title'><span>{project.title}</span></div>
                    <div className='project-creator'><span>{project.creator}</span></div>
                    <div className='project-description'><span>{project.description}</span></div>
                    <div className='project-members'><span>{members}</span></div>
                </div>

                {tasksView(tasks)}
            </div>

        </div>
    );
}

export default ProjectTab;