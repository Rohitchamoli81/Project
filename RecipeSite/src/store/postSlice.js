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
        addPost:(state,action)=>{
            const postData={
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                status : action.payload.status,
                userId: action.payload.userId,
                featuredImage: action.payload.featuredImage,
                area: action.payload.area,
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
                existingPost.area = action.payload.area;
            }
        },

        setPostLoading:(state,action)=>{
            state.loading = action.payload;
        }
        ,setPostError:(state,action)=>{
            state.error = action.payload;
        }
    }
});

export const {addPost, updatePost, setPostError,setPostLoading} = postSlice.actions;
export default postSlice.reducer;