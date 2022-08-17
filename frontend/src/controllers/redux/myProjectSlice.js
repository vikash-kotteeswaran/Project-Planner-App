import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProjects = createAsyncThunk('myProject/getUserProjects', async (payload) => {
    const userId = payload.userId;
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/getUserProjectsDetails?userId=${userId}`);
    const data = response.json();

    return data;
});

export const getProjectTasks = createAsyncThunk('myProject/getProjectTasks', async (payload) => {
    const projectId = payload.projectId;
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchTasks?types==&natures=AND&fields=projectId&values=${projectId}`);
    const data =  response.json();

    console.log(data);

    return data
});

export const addNewProject = createAsyncThunk('myProject/addNewProject', async (payload) => {
    const response = await fetch('https://api-projectplanner.herokuapp.com/api/addProjectsDetails', {
        'headers':{
            'content-type': 'application/json'
        },
        'method':'POST',
        'body': JSON.stringify({
            'title': payload.title,
            'description': payload.description,
            'admin': payload.admin,
            'status': payload.status,
            'userId': payload.userId
        })
    });

    const data = response.json();

    return data;
});

export const deleteProject = createAsyncThunk('myProject/deleteProject', async (payload) => {
    const response = await fetch('https://api-projectplanner.herokuapp.com/api/deleteProjectsDetails', {
        'headers':{
            'content-type': 'application/json'
        },
        'method':'DELETE',
        'body': JSON.stringify({
            'projectId': payload.projectId
        })
    });

    const data = response.json();

    return data;
});

export const getProjectMembers = createAsyncThunk('myProject/getProjectMembers', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/getProjectMembers?projectId=${payload.projectId}`);
    const data = response.json();

    return data;
});

export const addNewTask = createAsyncThunk('myProject/addNewTask', async (payload) => {
    const response = await fetch('https://api-projectplanner.herokuapp.com/api/addTasks', {
        'headers':{
            'content-type': 'application/json'
        },
        'method':'POST',
        'body': JSON.stringify({
            'title': payload.title,
            'description': payload.description,
            'projectId': payload.projectId,
            'status': payload.status,
            'userId': payload.userId
        })
    });

    const data = response.json();

    return data;
});

export const deleteTask = createAsyncThunk('myProject/deleteTask', async (payload) => {
    const response = await fetch('https://api-projectplanner.herokuapp.com/api/deleteTasks', {
        'headers':{
            'content-type': 'application/json'
        },
        'method':'DELETE',
        'body': JSON.stringify({
            'taskId': payload.taskId
        })
    });

    const data = response.json();

    return data;
});

const myProjectSlice = createSlice({
    name: "myProject",
    initialState: {
        projects: [],
        tasks: [],
        members: [],
        loading: false
    },
    reducers:{
        eraseStates: (state) => {
            state.projects = [];
            state.tasks = [];
            state.members = [];
        },

        eraseProjectStates: (state) => {
            state.tasks = [];
            state.members = [];
        }
    },
    extraReducers: {
        [getUserProjects.pending]: (state) => {
            console.log('getting user projects...');
            state.loading = true;
        },
        [getUserProjects.fulfilled]: (state, action) => {
            const data = action.payload;
            // change projects such that it doesn't return a zero length arrays even if data.length is zero
            state.projects = data.success.data;
            console.log('user projects obtained', state.projects);
            state.loading = false;
        },

        [getProjectTasks.pending]: () => {console.log('getting project tasks...')},
        [getProjectTasks.fulfilled]: (state, action) => {
            const data = action.payload;
            state.tasks = data.success.data;
            console.log('project tasks obtained', state.tasks);
        },

        [addNewProject.pending]: () => {console.log('adding new project...')},
        [addNewProject.fulfilled]: (state, action) => {
            console.log(action);
            if(action.payload.success.affectedRows <= 1){
                console.log('new project added.');
            }
        },

        [deleteProject.pending]: () => {console.log('deleting project...')},
        [deleteProject.fulfilled]: (state, action) => {
            console.log(action);
            if(action.payload.success.projectsDetails.changedRows <= 1 && action.payload.success.projectsAndUsers.changedRows <= 1 && action.payload.success.tasks.changedRows <= 1){
                console.log('project deleted.');
            }
        },

        [getProjectMembers.pending]: () => {console.log('getting the names of project members...')},
        [getProjectMembers.fulfilled]: (state, action) => {
            console.log(action);
            state.members = action.payload.success.data;
            console.log('members of the project has been obtained', state.members);
        },

        [addNewTask.pending]: () => {console.log('adding new task...')},
        [addNewTask.fulfilled]: (state, action) => {
            console.log(action);
            if(action.payload.success.affectedRows <= 1){
                console.log('new task added.');
            }
        },

        [deleteTask.pending]: () => {console.log('deleting task...')},
        [deleteTask.fulfilled]: (state, action) => {
            console.log(action);
            if(action.payload.success.changedRows <= 1){
                console.log('task deleted.');
            }
        }
    }
})

export default myProjectSlice.reducer;

export const {eraseStates, eraseProjectStates} = myProjectSlice.actions;