// create slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CancelTokenSource } from "axios";
import { RootState } from "../../app/store";
import axios, { AxiosError } from "axios";
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// setting our type script requirments
export type usersType = {
    id:number,
    name:string
}


// create a blank state where our slice where store users
const initialState:usersType[] = [
]

// our thunk function that will fetch our users when called
// we set identified for our thunk that will be used to listen for pending and fulfill requests
// we call our thunk API features to handles rejects to call our reject promise and a signal to let us cut connection
// when making excessive api requests
export const fetchUsers = createAsyncThunk('users/fetchUsers', async(_,{ rejectWithValue, signal })=> {
    // try block
    try{
        // set a source that we store a axios token
        const source: CancelTokenSource = axios.CancelToken.source();
        // apply a listener so that we can cancel our token
        signal.addEventListener('abort', () => {
            source.cancel()
          })
        // we run our get api passing our cancel token so we can cut our connection later when our component unmounts
        const response = await axios.get(USERS_URL,{ cancelToken: source.token,}).catch(()=> {
            // our catch throws an error that our catch block gets when we run into an issue retrieving data
            throw new Error ("Api had issues");
        });
        // log our result for trouble shooting
        console.log("direct API",response.data);
        // return our data to be utilized as a payload item
        return [...response.data.map((x:any)=> {
            return {id: x.id, name: x.name}
        })];
        // our catch will get our error we threw earlier
    } catch (error: unknown) {
        // check error and then reject with our rejuect with value instance we got from our thunk api
        // this will run a reject promise for our extra reducers to listen to
        if(error instanceof Error){
            return rejectWithValue(error);
        }
    }
})

// create a slice which just sets our state
const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {},
    // our extra reducers that listen to functions outside our object and runs the code within
    extraReducers(builder) {
        // if fetch user is fulfilled then run our function state and action
        builder.addCase(fetchUsers.fulfilled, (_,action)=> {
            console.log("Payload",action.payload)
            // we are just passing our payload to the state which was the response data.
            return action.payload;
        })
    }
})

// create a select all users functions which just fetches state for our components
export const selectAllUsers = (state: RootState) => state.users;

// export our reducer
export default userSlice.reducer;