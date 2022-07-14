import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

export const Authenticate = createAsyncThunk('auth/Authenticate', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchData?types==&natures=AND&fields=name&values=${payload.name}&types==&natures=AND&fields=password&values=${payload.password}`);
    const present = response.json();

    return present;
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        LoggedIn: false,
        authorized: false,
        failure: false
    },
    reducers: {
        logIn: (state, action) => {
            const { name, password } = action.payload;
            state.authorized = true;
            state.LoggedIn = true;
        },

        logOut: (state) => {
            state.LoggedIn = false;
            state.authorized = false;
            state.failure = false;
        },

        signUp: (state, action) => {
            const {name, password} = action.payload;
        },
        failure_span: (state, action) => {
            state.failure = action.payload.failure;
            console.log('faiulure')
        }
    },
    extraReducers:{
        [Authenticate.pending]: (state, action) => {console.log("Authenticating...");},
        [Authenticate.fulfilled]: (state, action) => {
            console.log("Authenticated.", action.payload);

            if(action.payload.success.data.length === 1){
                state.authorized = true;
                state.LoggedIn = true;
            } else{
                state.failure = true;
            }
        }
    }
});

export default authSlice.reducer;

export const {logIn, logOut, signUp, failure_span} = authSlice.actions;