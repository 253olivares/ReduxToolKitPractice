// redux practice 2 typescript practice
// import our slice and payload actions nanoid
import { createSlice,PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import our root state for type script
import { RootState } from "../../app/store"; 
import { sub } from "date-fns";
import axios, { CancelTokenSource } from "axios";
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10';

// this is our state slice
// extends our type for our api request
export type initialPostStateType = oringalPostsStateType& {
        date:string,
        reactions: Record<string, number>
    }
// create types for teh data we get from our api
type oringalPostsStateType = {
    id: number,
    title:string,
    body:string,
    userId:number
}
// type for out state
type initialStateType = {
    posts: Array<initialPostStateType>,
    status: 'idle'|'loading'| 'succeeded'|'failed',
    error: null | string
}

// new state is a posts holder to all our posts
// a status to display a loader on our page when we are fetching data
// and an error state to catch any issues and display them.
const initialState: initialStateType = {
    posts:[],
    status: 'idle', //'idle','loading,'succeeded','failed
    error:null
}

// create a fetch post thunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_,{rejectWithValue, signal})=> {
    // all in our api features reject with value and singal
    try {
        // create a connection 
        const source: CancelTokenSource = axios.CancelToken.source();
        // cut connection when we call abort in our parent div
        signal.addEventListener('abort', () => {
            source.cancel()
        })
        // get our response data
        const response = await axios.get(POSTS_URL,{ cancelToken: source.token,}).catch(()=> {
            throw new Error ("Api had issues");
        });
        // return data to payload
        return [...response.data];
    } catch (error: unknown) {
        // reject if we run into any issues
        return rejectWithValue(error);
    }
})

// repeat oif above we gather our data being sent through our dispatch
export const addNewPost = createAsyncThunk('posts/addNewPosts', async (initialPost:{title:string, body:string, userId:number},{rejectWithValue}) => {
    try {
        // pass information to api
        const response = await axios.post(POSTS_URL, initialPost).catch(()=> {
            throw new Error ("Api had issues");
        });
        // return data and pass it to our payloader
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(error);
    }
})

// create a slice
const postSlice = createSlice({
    name: 'posts',
    // set name
    // set state
    initialState,
    // create reducers
    reducers: {
    
        // section reducer that adds one value to our reactions depending on the reaction passed over
        reactionAdded (state, action:PayloadAction<{postId:number,reaction:string}>) {
            // take our our post id and reaction from payload
            const {postId, reaction} = action.payload
            // find post from state
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) {
                // then modify the reaction by name
                existingPost.reactions[reaction as keyof {}]++;
            }            
        }
        //     (state, action: PayloadAction<initialStateType>) {
        //     // state.push mutates an array
        //     // normal way would be to spread the state and then add changes at the end
        //     // redux toolkit js user emmer js which lets us mutate state
        //     state.unshift(action.payload)
        // }
    },
    // Our extra reducers will listen for when our thunk functions get called outside our slicer and run code within each section
    extraReducers(builder) {
        builder
            // While we are fetchindata from our fetch posts we are going to set a loading status
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            // Once our data returns we pass a status of succeeded
            .addCase(fetchPosts.fulfilled,(state,action)=> {
                state.status = 'succeeded';
                let min:number = 1;
                // add additional information to our payloader
                const loadedPosts: initialPostStateType[] = action.payload.map(post=> {
                    post.date = sub(new Date(), {minutes:min++}).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                // set the state
                // console.log(loadedPosts);
                state.posts = loadedPosts;
            })
            // reject our fetch request if we have any issues
            .addCase(fetchPosts.rejected, (state,action)=> {
                state.status = 'failed';
                if(action.error.message) {
                    state.error = action.error.message;   
                }
            })
            // our reducer for new posts
            // we pass over a id body content and title content from our form and the push it onto the state
            .addCase(addNewPost.fulfilled, (state,action) => {
                action.payload.id = state.posts.length+5;
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }

                state.posts.unshift(action.payload);
            })
    }
})

//our select all 

// selectors to call our states in the components
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

// export our function
// passing our one reducer action so it can be called outside redux
export const { reactionAdded } = postSlice.actions;

// export our reducer to store
export default postSlice.reducer;