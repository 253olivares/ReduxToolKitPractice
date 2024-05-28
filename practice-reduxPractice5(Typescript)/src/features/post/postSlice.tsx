// redux practice 2 typescript practice
// import our slice and payload actions nanoid
import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
// import our root state for type script
import { RootState } from "../../app/store"; 
import { sub } from "date-fns";
import axios, { CancelTokenSource } from "axios";
// to urls as to pagnate our posts when we first fetch them
const POSTS_URL_PAGNATED = 'https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// adapter that will create our entities and set our ids to be the same as our post.id
// sort comparer will organize the posts by date
const postsAdapter = createEntityAdapter({
    selectId: (post: initialPostStateType) => post.id,
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

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
    ids:number[]
    entities: Record<number, initialPostStateType>
    status: 'idle'|'loading'| 'succeeded'|'failed',
    error: null | string,
    count: number
}

// new state is a posts holder to all our posts
// a status to display a loader on our page when we are fetching data
// and an error state to catch any issues and display them.
const initialState:initialStateType = postsAdapter.getInitialState({
    status: 'idle', //'idle','loading,'succeeded','failed
    error:null,
    count: 0
})



// create a fetch post thunk
// Fetch those paginated posts
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
        const response = await axios.get(POSTS_URL_PAGNATED,{ cancelToken: source.token,}).catch(()=> {
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
export const addNewPost = createAsyncThunk('posts/addNewPosts', async (initialPost:{title:string, body:string, userId:number},{rejectWithValue,signal}) => {
    try {
        // pass information to api
        const source: CancelTokenSource = axios.CancelToken.source();
        // cut connection when we call abort in our parent div
        signal.addEventListener('abort', () => {
            source.cancel()
        })
        const response = await axios.post(POSTS_URL, initialPost,{ cancelToken: source.token,}).catch(()=> {
            throw new Error ("Api had issues");
        });
        // return data and pass it to our payloader
        return response.data;
    } catch (error: unknown) {
        return rejectWithValue(error);
    }
})

// update post function
// importing thunk signal to abort request when component unloads
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost: {id:number, title:string, body: string, userId: number, reactions: Record<string, number>},{rejectWithValue,signal})=> {
    console.log("Update Post",initialPost);
    const {id}: {id:number} = initialPost;
    try {
        // create a cancel token that come build in with axios  
        const source: CancelTokenSource = axios.CancelToken.source();
        // listen for our abort
        signal.addEventListener('abort', () => {
            source.cancel()
        })
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost, { cancelToken: source.token,})
        return response.data
    } catch (err) {  
        if(id > 100) {
            // if our post id is greater then 100 return our payload anyways 
            // this is a problem that occurs within the api since the api only accepts up to 100 items
            return initialPost;
        }
        console.log("Ran into a problem updating this post",err);
        rejectWithValue(err);
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost: {id:number}, {rejectWithValue, signal})=> {
    const {id} = initialPost;
    try {
        const source: CancelTokenSource = axios.CancelToken.source();
        // cut connection when we call abort in our parent div
        signal.addEventListener('abort', () => {
            source.cancel()
        })
        const response = await axios.delete(`${POSTS_URL}/${id}`,{ cancelToken: source.token,}).then((res) => {
            if(res?.status !== 200) {
                throw new Error (`Problem Occured Please Refrence - ${res?.status}: ${res?.statusText}` );
            } 
        })
        console.log("Delete Post:",response);
        return initialPost;
    } catch (err) {
        // reject to trigger our rejected listener
        // realistically we dont have one for this practice
        rejectWithValue(err);
        console.log(err);
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
            console.log(state);
            const existingPost = state.entities[postId]
            if(existingPost) {
                // then modify the reaction by name
                existingPost.reactions[reaction as keyof {}]++;
            }            
        },
        increaseCount(state) {
            state.count = state.count+1;
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
               postsAdapter.upsertMany(state, loadedPosts)
            })
            // reject our fetch request if we have any issues
            .addCase(fetchPosts.rejected, (state,action)=> {
                state.status = 'failed';
                if(action.error.message) {
                    state.error = action.error.message;   
                }
            })
            // our reducer for new post
            // we pass over a id body content and title content from our form and the push it onto the state
            .addCase(addNewPost.fulfilled, (state,action) => {
                action.payload.id = state.ids.length+5;
                action.payload.useId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }  
                postsAdapter.addOne(state, action.payload)
            })
            // lisener for redux when it sees update post has bee fulfilled it will
            // run the following code to update our state
            .addCase(updatePost.fulfilled, (state, action)=> {
                if(!action.payload?.id){
                    // unique error that only exists bc of the api we are using
                    // since we are using json placeholder api 
                    console.log('Update could not be complete')
                    console.log(action.payload)
                    return;
                }
                action.payload.date = new Date().toISOString();
                postsAdapter.upsertOne(state,action.payload);
            })
            // when redux listens to the delete post function and fins that it has completed fulfilled
            // we update our state
            .addCase(deletePost.fulfilled, (state,action)=> {
                console.log("DeletePost Fullfilled action:", action);
                if(!action.payload?.id){
                    // if our id doesnt exist then we print an error coming from our fufilled
                    // this problem occures bc we can not actually mess with the actual data set values
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                } else {
                    // typescript believes id can return as undefined so we may be trying to access a value that doesnt exist so we wrap in
                    // an else statement to make sure we are only trying to access the value when it exists
                    const id = action.payload.id;
                    postsAdapter.removeOne(state,id);
                }
            })
    }
})

//our select all 

// selectors to call our states in the components
// export const selectAllPosts = (state: RootState) => state.posts.posts;

// Note: https://redux-toolkit.js.org/api/createEntityAdapter

// change name of our selects that come preinstalled with reduc getSelector
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: {posts:{
    ids: number[],
    entities: Record<number,initialPostStateType>,
    status: 'idle'|'loading'| 'succeeded'|'failed',
    error: null | string,
    count: number
}}) => state.posts)

export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const getCounter = (state:RootState) => state.posts.count;

// selector that lets us grab our post by using id. This is done but looping through our state using .find and returning 
//the object where post.id === postId *PostId passed through our dispatch as a payload (To fit with type script requirments we need to specify that 
// it will always be a number that is passed)
// export const selectPostById = (state: RootState , postId:number) => state.posts.posts.find(post => post.id === postId);

// create selector sets 2 dependencies which will be our select all posts and our function that returns user ID
// then with post properties we filter and return our posts lists that match our userId
export const selectPostByUser = createSelector(
    [selectAllPosts, (_, userId:number) => userId],
    (posts, userId)=> posts.filter(post => post.userId === userId)
)

// export our function
// passing our one reducer action so it can be called outside redux
export const { reactionAdded, increaseCount } = postSlice.actions;

// export our reducer to store
export default postSlice.reducer;