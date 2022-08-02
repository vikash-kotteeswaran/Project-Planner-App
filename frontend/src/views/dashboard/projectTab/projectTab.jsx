import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import './projectTab.css';


const ProjectTab = () => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const {project, tasks, members} = state;
    console.log(tasks)

    // const wordLimiter = (paragraph) => {
    //     // Colour of readmore should be gray... look onto that
    //     const windowLimit = 30;
    //     if(paragraph.length > windowLimit) return paragraph.slice(0, windowLimit) + '... read more';
    //     else return paragraph;
    // }

    const onTaskClick = (event) => {
        const taskId = event.currentTarget.id;
        console.log('taskId', taskId);

        const task = tasks.filter(task => task.taskId == taskId)[0];

        navigate(`/task/${taskId}`, {state: {task: task}});
    }

    const tasksView = () => {
        const done = [];
        const inProgress = [];
        const toBeDone = [];
        
        for(const task of tasks) {
            switch(task.status.toLowerCase()) {
                case 'done':
                    done.push(
                        <div id={task.taskId} className='task' onClick={onTaskClick}>
                            <div className='task-title'><span>{task.title}</span></div>
                            {/* <div className='task-creator'><span>{task.creator}</span></div>
                            <div className='task-assigned-to'><span>{task.userAssigned}</span></div>
                            <div className='task-description'><span>{wordLimiter(task.description)}</span></div> */}
                        </div>
                    );
                    break;
                
                case 'in progress':
                    inProgress.push(
                        <div id={task.taskId} className='task' onClick={onTaskClick}>
                            <div className='task-title'><span>{task.title}</span></div>
                            {/* <div className='task-creator'><span>{task.creator}</span></div>
                            <div className='task-assigned-to'><span>{task.userAssigned}</span></div>
                            <div className='task-description'><span>{wordLimiter(task.description)}</span></div> */}
                        </div>
                    )
                    break;

                case 'to be done':
                    toBeDone.push(
                        <div id={task.taskId} className='task' onClick={onTaskClick}>
                            <div className='task-title'><span>{task.title}</span></div>
                            {/* <div className='task-creator'><span>Created by </span><span className='task-creator-span'>{task.userId}</span></div>
                            <div className='task-assigned-to'><span>Assigned to </span><span className='task-assigned-to-span'>{task.userAssignedId}</span></div>
                            <div className='task-description'><span>{wordLimiter(task.description)}</span></div> */}
                        </div>
                    )
                    break;
                
                default:
                    console.log('Invalid status', task.taskId);
                };
            };

        return (
            <div className='tasks'>
                <div className='done'>
                    <div className='done-header'>Done</div>
                    <div className='done-list'>{done}</div>
                </div>
                <div className='in-progress'>
                    <div className='in-progress-header'>In Progress</div>
                    <div className='in-progress-list'>{inProgress}</div>
                </div>
                <div className='to-be-done'>
                    <div className='to-be-done-header'>To Be Done</div>
                    <div className='to-be-done-list'>{toBeDone}</div>
                </div>
            </div>
        );
    };


    return (
        <div className='project-view'>
            <Sidebar />
            <div className='project-main'>
                <div className='project-overview'>
                    <div className='project-overview-header'>
                        <div className='project-title'><span>{project.title}</span></div>
                        <div className='add-project'><i className="fa fa-plus"></i></div>
                    </div>
                    <div className='project-contribs'>
                        <div className='project-admin'><span>{project.userId}</span></div>
                        <div className='project-members'><span>{project.userId}</span></div>
                    </div>
                    <div className='project-description'><span>{project.description}</span></div>
                </div>

                {tasksView()}
            </div>

        </div>
    );
}

export default ProjectTab;