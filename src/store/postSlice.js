import { createSlice } from "@reduxjs/toolkit";


const InitialState = { currPost: null, allPosts: null };

const postSlice = createSlice(
    {
        name: 'post',
        initialState: InitialState,
        reducers: {
            currPost: (state, action) => {
                state.currPost = action.payload.post;
            },
            setAllPosts: (state, action) => {
                state.allPosts = action.payload.posts;
            }
        }
    }
)


export const { currPost, setAllPosts } = postSlice.actions;

export const postReducer = postSlice.reducer;

export const postSelector = (state) => state.postReducer;