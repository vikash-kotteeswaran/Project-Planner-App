import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProjects = createAsyncThunk('myProject/getUserProjects', async (payload) => {
    const userId = payload.userId;
    console.log(userId);
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/getUserProjectsDetails?userId=${userId}`)
    const data = response.json();

    return data;
})

const myProjectSlice = createSlice({
    name: "myProject",
    initialState: {
        projects: [],
        projectClicked: null
    },
    reducers:{
        clickedOnProject: (state, action) => {
            state.projectClicked = action.payload.projectId;
        }
    },
    extraReducers: {
        [getUserProjects.pending]: () => {console.log('getting user projects...')},
        [getUserProjects.fulfilled]: (state, action) => {
            const data = action.payload;
            state.projects = data.success.data;
            console.log('user projects obtained', state.projects);
        }
    }
})

export default myProjectSlice.reducer;

export const {clickedOnProject} = myProjectSlice.actions;