// redux practice 2 typescript practice
// import our slice and payload actions nanoid
import { createSlice,PayloadAction,nanoid } from "@reduxjs/toolkit";
// import our root state for type script
import { RootState } from "../../app/store"; 
import { sub } from "date-fns";

// this is our state slice
export type initialPostStateType = {
        id: string,
        title: string,
        content:string,
        date:string,
        userId:string,
        reactions: Record<string, number>
    }

    // initial state 
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

// create a slice
const postSlice = createSlice({
    name: 'posts',
    // set name
    // set state
    initialState,
    // create reducers
    reducers: {
        // action PayloadAction<number>
        // our post added function 
        postAdded: {
            // we run our reducer after our prepare
            reducer(state, action:PayloadAction<initialPostStateType>) {
                // directly mutate state
                state.unshift(action.payload)
                // unmutable state format still works
                // redux toolkit just lets us directly mutate it
                // return [action.payload,...state]
            },
            // prepare is used to add additional information to our payload before its passed to reducer
            prepare(title:string, content:string, userId:string) {
                // here we can set our default values before its sent to our state or in irl use case a server
                return{
                    // 
                    payload: {
                        // nano id is built in redux and creates a random id
                        id:nanoid(),
                        title,
                        content,
                        //date is handled by fns to turn date into a string for the state
                        date: new Date().toISOString(),
                        userId,
                        // add boiler plate reactions
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
        // section reducer that adds one value to our reactions depending on the reaction passed over
        reactionAdded (state, action:PayloadAction<{postId:string,reaction:string}>) {
            // take our our post id and reaction from payload
            const {postId, reaction} = action.payload
            // find post from state
            const existingPost = state.find(post => post.id === postId)
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
    }
})

//our select all 
export const selectAllPosts = (state: RootState) => state.posts;

// export our function
export const { postAdded, reactionAdded } = postSlice.actions;

// export our reducer to store
export default postSlice.reducer;