import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProjects = createAsyncThunk('myProject/getUserProjects', async (payload) => {
    const userId = payload.userId;
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/getUserProjectsDetails?userId=${userId}`);
    const data = response.json();

    return data;
})

export const getProjectTasks = createAsyncThunk('myProject/getProjectTasks', async (payload) => {
    const projectId = payload.projectId;
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchTasks?types==&natures=AND&fields=projectId&values=${projectId}`);
    const data =  response.json();

    return data
})

const myProjectSlice = createSlice({
    name: "myProject",
    initialState: {
        projects: [],
        tasks: [],
    },
    reducers:{
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
        }
    }
})

export default myProjectSlice.reducer;

// export const {clickedOnProject, clickedOnTask, goBackProject, goBackTask} = myProjectSlice.actions;