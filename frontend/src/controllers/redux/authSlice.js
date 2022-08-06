import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// If already the user exists, return with user exists span info

export const authenticate = createAsyncThunk('auth/Authenticate', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchUsersCred?types==&natures=AND&fields=name&values=${payload.name}&types==&natures=AND&fields=password&values=${payload.password}`);
    const present = response.json();
    return present;
})

export const addUser = createAsyncThunk('auth/AddUser', async (payload) => {
    const response = await fetch('https://api-projectplanner.herokuapp.com/api/addUsersCred', {
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
        userId: localStorage.getItem('userId') || null,
        userName: localStorage.getItem('userName') || null,
        loggedIn: localStorage.getItem('loggedIn') || false,
        authorized: localStorage.getItem('authorized') || false,
        failure: false,
        signedUp: false
    },
    reducers: {
        logIn: (state) => {
            if(state.authorized){
                state.loggedIn = true;
                localStorage.setItem('loggedIn', true);
            };
        },

        logOut: (state) => {
            state.loggedIn = false;
            state.authorized = false;
            state.failure = false;
            state.signedUp = false;
            state.userId = null;
            state.userName = null;

            localStorage.removeItem('loggedIn');
            localStorage.removeItem('authorized');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
        },

        guestLogIn: (state) => {
            state.authorized = true;
            state.userId = 1;
            state.userName = 'vikash';
            
            localStorage.setItem('authorized', true);
            localStorage.setItem('userId', state.userId);
            localStorage.setItem('userName', state.userName);
        },

        failure_span: (state, action) => {
            state.failure = action.payload.failure;
        }
    },
    extraReducers:{
        [authenticate.pending]: () => {console.log("Authenticating...");},
        [authenticate.fulfilled]: (state, action) => {

            if(action.payload.success.data.length === 1){
                state.authorized = true;
                localStorage.setItem('authorized', true);
            } else{
                state.failure = true;
            }

            state.userId = action.payload.success.data[0].userId;
            state.userName = action.payload.success.data[0].userName;

            localStorage.setItem('userId', state.userId);
            localStorage.setItem('userName', state.userName);

            console.log("Authenticated.", action.payload, state.userId);
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

export const {logIn, logOut, signUp, failure_span, guestLogIn} = authSlice.actions;