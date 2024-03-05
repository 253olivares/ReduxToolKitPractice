import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type initialStateType = {
    id:string,
    name:string
}

const initialState:Array<initialStateType> = [
    {id:'0', name:"dude Lebowski"},
    {id:'1', name:'Neil Young'},
    {id:'2', name:'Dave Gray'}
]

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {

    }
})

export const selectAllUsers = (state: RootState) => state.users;

export default userSlice.reducer;