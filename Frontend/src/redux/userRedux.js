import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({

    name: "user", //slice i can be on

    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },

    reducers:{
        loginStart: (state) =>{
            state.isFetching = true;
        },
        loginSuccess: (state, action) =>{
            state.isFetching = false; //bcz im logged in
            state.currentUser = action.payload
        },
        loginFailure: (state) =>{

            state.isFetching = false;
            state.error = true
        },

        logOut: (state) =>{
            state.isFetching = false;
            state.error = false;
            state.currentUser = null; //bcz iv logged out
        }
    }
})

export const {loginFailure, loginStart, loginSuccess, logOut} = userSlice.actions;
export default userSlice.reducer