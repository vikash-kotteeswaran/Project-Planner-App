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

const myProjectSlice = createSlice({
    name: "myProject",
    initialState: {
        projects: [],
        tasks: [],
        members: [],
        tasksChanged: 0,
        projectsChanged: 0
    },
    reducers:{
        userLoggingOut: (state) => {
            state.projects = [];
            state.tasks = [];
        }
    },
    extraReducers: {
        [getUserProjects.pending]: () => {console.log('getting user projects...')},
        [getUserProjects.fulfilled]: (state, action) => {
            const data = action.payload;
            // change projects such that it doesn't return a zero length arrays even if data.length is zero
            state.projects = data.success.data;
            console.log('user projects obtained', state.projects);
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
            if(action.payload.success.affectedRows == 1){
                console.log('new project added.');
                state.projectsChanged += 1;
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
            if(action.payload.success.affectedRows == 1){
                console.log('new task added.');
                state.tasksChanged += 1;
            }
        }
    }
})

export default myProjectSlice.reducer;

export const {userLoggingOut} = myProjectSlice.actions;