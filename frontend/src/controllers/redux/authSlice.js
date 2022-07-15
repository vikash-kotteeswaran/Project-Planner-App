import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// If already the user exists, return with user exists span info

export const authenticate = createAsyncThunk('auth/Authenticate', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchData?types==&natures=AND&fields=name&values=${payload.name}&types==&natures=AND&fields=password&values=${payload.password}`);
    const present = response.json();
    return present;
})

export const addUser = createAsyncThunk('auth/AddUser', async (payload) => {
    const response = await fetch('https://api-projectplanner.herokuapp.com/api/addUser', {
        'headers':{
            'content-type': 'application/json'
        },
        'method':'POST',
        'body': JSON.stringify({
            'name': payload.name,
            'password': payload.password
        })
    });
    const added = response.json()
    return added;
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedIn: false,
        authorized: false,
        failure: false,
        signedUp: false
    },
    reducers: {
        logIn: (state) => {
            if(state.authorized){
                state.loggedIn = true;
            };
        },

        logOut: (state) => {
            state.loggedIn = false;
            state.authorized = false;
            state.failure = false;
            state.signedUp = false;
        },

        signUp: (state, action) => {
            const {name, password} = action.payload;
        },
        failure_span: (state, action) => {
            state.failure = action.payload.failure;
        }
    },
    extraReducers:{
        [authenticate.pending]: (state, action) => {console.log("Authenticating...");},
        [authenticate.fulfilled]: (state, action) => {
            console.log("Authenticated.", action.payload);

            if(action.payload.success.data.length === 1){
                state.authorized = true;
            } else{
                state.failure = true;
            }
        },
        [addUser.pending]: (state, action) => {console.log('adding user...');},
        [addUser.fulfilled]: (state, action) => {
            console.log('User Added.', action.payload);
            if(action.payload.success.affectedRows === 1){
                state.signedUp = true;
            }
        }
    }
});

export default authSlice.reducer;

export const {logIn, logOut, signUp, failure_span} = authSlice.actions;