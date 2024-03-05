import { createSlice,PayloadAction,nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"; 
import { sub } from "date-fns";

export type initialPostStateType = {
        id: string,
        title: string,
        content:string,
        date:string,
        userId:string,
        reactions: Record<string, number>
    }

const initialState:Array<initialPostStateType> = [
    {
        id:'1', 
        title: 'Learning Redux Toolkit', 
        content: "I've head good things.",
        date: sub(new Date(), {minutes:10}).toISOString(),
        userId: "0",
        reactions: {
            thumbs:0,
            wow:0,
            hearts: 0,
            rocket:0,
            coffee:0
        }
    },
    {
        id:'2', 
        title: "slices..." , 
        content: "The more I say slice, the more I want pizza.", 
        date: sub(new Date(), {minutes:5}).toISOString(), 
        userId: "1",
        reactions: {
            thumbs:0,
            wow:0,
            hearts: 0,
            rocket:0,
            coffee:0
        }
    }
]

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // action PayloadAction<number>
        postAdded: {
            reducer(state, action:PayloadAction<initialPostStateType>) {
                // directly mutate state
                state.unshift(action.payload)
                // unmutable state format still works
                // redux toolkit just lets us directly mutate it
                // return [action.payload,...state]
            },
            prepare(title:string, content:string, userId:string) {
                return{
                    payload: {
                        id:nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbs:0,
                            wow:0,
                            hearts: 0,
                            rocket:0,
                            coffee:0
                        }
                    }
                }
            }
        },
        reactionAdded (state, action:PayloadAction<{postId:string,reaction:string}>) {
            const {postId, reaction} = action.payload
            const existingPost = state.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction as keyof {}]++;
            }            
        }
        //     (state, action: PayloadAction<initialStateType>) {
        //     // state.push mutates an array
        //     // normal way would be to spread the state and then add changes at the end
        //     // redux toolkit js user emmer js which lets us mutate state
        //     state.unshift(action.payload)
        // }
    }
})

export const selectAllPosts = (state: RootState) => state.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;