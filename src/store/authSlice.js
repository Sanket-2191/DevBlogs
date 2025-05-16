import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = { loggedIn: false, user: null }

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        login: (state, action) => {
            // console.log("In login action: ", action);

            state.loggedIn = true;
            state.user = action.payload.user;
        },
        logout: (state, action) => {
            state.loggedIn = false;
            state.user = null;
        }
    }
}
)

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const authSelector = (state) => state.authReducer;