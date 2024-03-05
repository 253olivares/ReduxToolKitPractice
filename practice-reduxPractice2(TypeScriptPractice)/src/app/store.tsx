import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/post/postSlice'
import userReducer from '../features/users/usersSlice'

// create our store and import our slices and set them in our state store
export const store = configureStore({
    reducer:{
        posts:postsReducer,
        users:userReducer,
    }
    
})

// this is unique to type script we need to import our dispatch and a get stat function and then set 
// custon inerface for them so that type script knows that we are using redux.
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch