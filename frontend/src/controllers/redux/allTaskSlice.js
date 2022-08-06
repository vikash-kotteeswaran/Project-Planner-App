import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTasks = createAsyncThunk('allTasks/getAllTasks', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/getAllTasks?start=${payload.start}&count=${payload.pageCount}`);
    const data = response.json();

    return data;
});

export const searchTasks = createAsyncThunk('allTasks/searchTasks', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchTasks?natures=AND&types=LIKE&fields=${payload.field}&values=${payload.value}&start=${payload.start}&count=${payload.pageCount}`);
    const data =  response.json();

    return data;
});

export const searchTasksLength = createAsyncThunk('allTasks/searchTasksLength', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchLengthTasks?natures=AND&types=LIKE&fields=${payload.field}&values=${payload.value}`);
    const data =  response.json();

    return data;
}); 

const allTasks = createSlice({
    name: 'allTasks',
    initialState: {
        allTasks: [],
        tasksLength: 0
    },
    reducers: {},
    extraReducers: {
        [getAllTasks.pending]: () => {console.log('getting all tasks...')},
        [getAllTasks.fulfilled]: (state, action) => {
            console.log('collected all tasks.');
            state.allTasks = action.payload.success.data || [];
        },

        [searchTasks.pending]: () => {console.log('search for tasks...')},
        [searchTasks.fulfilled]: (state, action) => {
            console.log('searched tasks.', action);
            state.allTasks = action.payload.success.data || [];
        },

        [searchTasksLength.pending]: () => {console.log('search for queried tasks length...')},
        [searchTasksLength.fulfilled]: (state, action) => {
            console.log('searched queried tasks length.', action);
            state.tasksLength = (action.payload.success.data[0] || 0).length || 0;
        },
    }
});

export default allTasks.reducer;