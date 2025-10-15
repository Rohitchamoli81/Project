import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    loading: true,
    error: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        fetchPosts:(state,action)=>{
            const postData={
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                status : action.payload.status,
                featuredImage: action.payload.featuredImage,
            }
            state.posts.push(postData);
        },

        updatePost:(state,action)=>{
            const {id, title, content} = action.payload;
            const existingPost = state.posts.find(post => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
                existingPost.status = action.payload.status;
                existingPost.featuredImage = action.payload.featuredImage;
            }
        },

        setLocalLoading:(state,action)=>{
            state.loading = action.payload;
        }
        ,setLocalError:(state,action)=>{
            state.error = action.payload;
        }
    }
});

export const {fetchPosts, updatePost, setLocalError,setLocalLoading} = postSlice.actions;
export default postSlice.reducer;