import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const crypto = require('crypto');

// If already the user exists, return with user exists span info

export const authenticate = createAsyncThunk('auth/Authenticate', async (payload) => {
    const response = await fetch(`https://api-projectplanner.herokuapp.com/api/searchUsersCred?types==&natures=AND&fields=name&values=${payload.name}`);
    const cred = await response.json();
    let userDetails = {
        userId: 0,
        userName: "",
        passwordMatched: false
    }

    if(crypto.pbkdf2Sync(payload.password, cred.success.data[0].salt, 1000, 64, 'sha256').toString('hex') == cred.success.data[0].password) {
        userDetails.passwordMatched = true;
        userDetails.userId = cred.success.data[0].userId;
        userDetails.userName = cred.success.data[0].userName;
    }

    return userDetails;
})

export const addUser = createAsyncThunk('auth/AddUser', async (payload) => {

    const checkUserExists = await fetch(`https://api-projectplanner.herokuapp.com/api/searchUsersCred?types==&natures=AND&fields=name&values=${payload.name}`);
    let userExists = await checkUserExists.json();
    userExists = (userExists.success.data.length > 0);

    if(!userExists){
        const salt = crypto.randomBytes(16).toString('hex');
        const password = crypto.pbkdf2Sync(payload.password, salt, 1000, 64, 'sha256').toString('hex');
        console.log(salt, password);

        const response = await fetch('https://api-projectplanner.herokuapp.com/api/addUsersCred', {
            'headers':{
                'content-type': 'application/json'
            },
            'method':'POST',
            'body': JSON.stringify({
                'name': payload.name,
                'password': password,
                'salt': salt
            })
        });
        const added = await response.json();
        return {success: {userExists: userExists, affectedRows: added.success.affectedRows}};
    } else {
        return {success: {userExists: userExists}};
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: localStorage.getItem('userId') || null,
        userName: localStorage.getItem('userName') || null,
        loggedIn: localStorage.getItem('loggedIn') || false,
        authorized: localStorage.getItem('authorized') || false,
        failure: false,
        signedUp: false,
        loading: false
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
        [authenticate.pending]: (state) => {
            console.log("Authenticating...");
            state.loading = true;
        },
        [authenticate.fulfilled]: (state, action) => {

            if(action.payload.passwordMatched){
                state.authorized = true;
                localStorage.setItem('authorized', true);

                state.userId = action.payload.userId;
                state.userName = action.payload.userName;

                localStorage.setItem('userId', state.userId);
                localStorage.setItem('userName', state.userName);

                console.log("Authenticated. Matched Successfully", action.payload, state.userId);
            } else{
                state.failure = true;
                console.log("Authenticated. Did not Match");
            }

            state.loading = false;
        },
        [addUser.pending]: (state) => {
            console.log('adding user...');
            state.loading = true;
        },
        [addUser.fulfilled]: (state, action) => {
            if(action.payload.success.userExists) {
                console.log('Username already exisits. User cannot be added.');
                state.failure = true;
            } else {
                console.log('User Added.', action.payload);
                if(action.payload.success.affectedRows === 1){
                    state.signedUp = true;
                }
            }

            state.loading = false;
        }, 
    }
});

export default authSlice.reducer;

export const {logIn, logOut, signUp, failure_span, guestLogIn} = authSlice.actions;