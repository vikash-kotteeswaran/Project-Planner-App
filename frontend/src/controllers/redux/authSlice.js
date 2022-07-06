import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        LoggedIn: false,
        authorized: false
    },
    reducers: {
        logIn: (state, action) => {
            const {name, password} = action.payload;
            state.LoggedIn = true;
            state.authorized = true;
        },

        logOut: (state) => {
            state.LoggedIn = false;
            state.authorized = false;
        },

        signUp: (state, action) => {
            const {name, password} = action.payload;
        }
    }
});

export default authSlice.reducer;

export const {logIn, logOut, signUp} = authSlice.actions;