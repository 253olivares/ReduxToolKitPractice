// create slice
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// will fucntion more in the same way as post but just less as all it does it house our users no additional changes
type initialStateType = {
    id:string,
    name:string
}

// set initial users state
const initialState:Array<initialStateType> = [
    {id:'0', name:"dude Lebowski"},
    {id:'1', name:'Neil Young'},
    {id:'2', name:'Dave Gray'}
]

// create a slice which just sets our state
const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {

    }
})

// create a select all users functions which just fetches state for our components
export const selectAllUsers = (state: RootState) => state.users;

// export our reducer
export default userSlice.reducer;