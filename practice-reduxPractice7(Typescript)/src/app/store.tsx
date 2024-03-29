import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'

// create our store and import our slices and set them in our state store
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    // middleware created using rtk query
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware)
    
})

// this is unique to type script we need to import our dispatch and a get stat function and then set 
// custon inerface for them so that type script knows that we are using redux.
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch