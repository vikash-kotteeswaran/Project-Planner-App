import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProjects = createAsyncThunk('allProjects/getAllProjects', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/getAllProjectsDetails?start=${payload.start}&count=${payload.count}`);
    const data = response.json();

    return data;
});

export const searchProjects = createAsyncThunk('allProject/searchProjects', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchProjectsDetails?natures=AND&types=LIKE&fields=${payload.field}&values=${payload.value}&start=${payload.start}&count=${payload.count}`);
    const data =  response.json();

    return data;
});

const allProjectSlice = createSlice({
    name: "allProjects",
    initialState: {
        allProjects: []
    },
    reducers: {},
    extraReducers: {
        [getAllProjects.pending]: () => {console.log('getting all projects...')},
        [getAllProjects.fulfilled]: (state, action) => {
            console.log('collected all projects.');
            state.allProjects = action.payload.success.data;
        },

        [searchProjects.pending]: () => {console.log('search for projects...')},
        [searchProjects.fulfilled]: (state, action) => {
            console.log('searched projects.', action);
            state.allProjects = action.payload.success.data || [];
        },
    }
});

export default allProjectSlice.reducer;