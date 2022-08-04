import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, getProjectMembers, getProjectTasks, deleteProject } from '../../../controllers/redux/myProjectSlice';
import Sidebar from '../sidebar/sidebar';
import './projectTab.css';


const ProjectTab = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {state} = useLocation();
    const {project, userId} = state;
    const myProject = useSelector(state => state.myProject);

    useEffect(() => {
        dispatch(getProjectTasks({projectId: project.projectId}));
        dispatch(getProjectMembers({projectId: project.projectId}));
    }, [dispatch]);

    const [newTaskWindow, setNewTaskWindow] = useState(false);
    const [deleteProjectWindow, setDeleteProjectWindow] = useState(false);

    const onTaskClick = (event) => {
        const taskId = event.currentTarget.id;
        console.log('taskId', taskId);

        const task = myProject.tasks.filter(task => task.taskId == taskId)[0];

        navigate(`/task/${taskId}`, {state: {task: task, projectRole: project.projectRole}});
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
                        </div>
                    );
                    break;
                
                case 'in progress':
                    inProgress.push(
                        <div id={task.taskId} className='task' onClick={onTaskClick}>
                            <div className='task-title'><span>{task.title}</span></div>
                        </div>
                    )
                    break;

                case 'to be done':
                    toBeDone.push(
                        <div id={task.taskId} className='task' onClick={onTaskClick}>
                            <div className='task-title'><span>{task.title}</span></div>
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

    const [newTaskInput, setNewTaskInput] = useState({
        title: '',
        description: '',
        status: 'None',
        userId: userId,
        projectId: project.projectId
    })

    const newTask = () => {

        const handleStatusChange = (event) => {
            setNewTaskInput({
                ... newTaskInput,
                status: event.target.value
            })
            event.preventDefault();
        }

        const handleTitleChange = (event) =>{
            setNewTaskInput({
                ... newTaskInput,
                title: event.target.value
            })
            event.preventDefault();
        }

        const handleDescChange = (event) =>{
            setNewTaskInput({
                ... newTaskInput,
                description: event.target.value
            })
            event.preventDefault();
        }

        const OnNewTaskSubmit = async (event) => {
            // https://stackoverflow.com/questions/37146302/event-preventdefault-in-async-functions
            event.preventDefault();
            let add = true;
            if(newTaskInput.title.length < 5 ) {
                add = false;
                const titleError = ' title-error'
                document.querySelector('input.new-task-title').className += titleError;
                console.log(document.querySelector('input.new-task-title').className);

                setTimeout(() => {
                    document.querySelector('input.new-task-title').className = 'new-task-title';
                    console.log(document.querySelector('input.new-task-title').className);
                }, 5000)
            }

            if(newTaskInput.status == 'None'){
                add = false;
                const statusError = ' status-error'
                document.querySelector('span.new-task-status-selector-span').className += statusError;
                document.querySelector('select.new-task-status').className += statusError;
                console.log(document.querySelector('span.new-task-status-selector-span').className);

                setTimeout(() => {
                    document.querySelector('span.new-task-status-selector-span').className = 'new-task-status-selector-span';
                    document.querySelector('select.new-task-status').className = 'new-task-status';
                    console.log(document.querySelector('span.new-task-status-selector-span').className);
                }, 5000)
            }

            if(add) {
                await dispatch(addNewTask(newTaskInput));
                setNewTaskWindow(false);
                window.location.reload();
            }
        }

        return (
            <div className='new-task'>
                <form className='new-task-form'>
                    <div className='cancel-adding-task' onClick={() => setNewTaskWindow(false)}><i className='fa fa-times'></i></div>
                    <input name='title' className='new-task-title' placeholder='Task Title' onChange={handleTitleChange} required></input>
                    <textarea name='description' className='new-task-description' placeholder='Task Description' onChange={handleDescChange}></textarea>

                    <div className='new-task-status-selector'>
                        <span className='new-task-status-selector-span'>Task Status</span>
                        <select name="status" className='new-task-status' value={newTaskInput.status} onChange={handleStatusChange}>
                            <option className='in-progress-option' value='None'>None</option>
                            <option className='in-progress-option' value='In progress'>In Progress</option>
                            <option className='to-be-done-option' value='To be done'>To Be Done</option>
                        </select>
                    </div>

                    <button className='submit-task-details' type='submit' onClick={OnNewTaskSubmit}>SUBMIT</button>
                </form>
            </div>
        );
    };

    const confirmDeleteProject = () => {
        return (
            <div className='confirm-delete-project'>
                <div className='confirm-delete-project-box'>
                    <span>Are you sure?</span>
                    <div className='confirmation-on-delete-project'>
                        <button className='delete-project-for-sure' onClick={deleteCurrentProject}>Delete</button>
                        <button className='cancel-delete-project' onClick={() => setDeleteProjectWindow(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    const onAddNewTask = () => {
        setNewTaskWindow(true);
    }

    const deleteCurrentProject = async () => {
        await dispatch(deleteProject({projectId: project.projectId}));
        window.history.go(-1);
    }

    const onDeleteProject = () => {
        setDeleteProjectWindow(true);
    }

    return (
        <div className='project-view'>
            {newTaskWindow? newTask() : <></>}
            {deleteProjectWindow? confirmDeleteProject() : <></>}
            <Sidebar />
            <div className='project-main'>
                <div className='project-overview'>
                    <div className='project-overview-header'>
                        <div className='project-title'>
                            <span>{project.title}</span>
                            {project.projectRole == 'admin'? <div className='delete-project' onClick={onDeleteProject}><i className="fa fa-trash"></i></div> : <></>}
                        </div>
                        {project.projectRole == 'admin'? <div className='add-task' onClick={onAddNewTask}><i className="fa fa-plus"></i></div> : <></>}
                    </div>
                    <div className='project-contribs'>
                        <div className='project-admin'><span>{project.creator}</span></div>
                        {myProject.members.length != 0? <div className='project-members'><span>{myProject.members.map(member => member.userName).join(', ')}</span></div> : <></>}
                        <div className={`project-status project-status-${project.status.toLowerCase().replaceAll(' ', '-')}`}>{project.status}</div>
                    </div>
                    <div className='project-description'><span>{project.description}</span></div>
                </div>

                {tasksView(myProject.tasks)}
            </div>

        </div>
    );
}

export default ProjectTab;