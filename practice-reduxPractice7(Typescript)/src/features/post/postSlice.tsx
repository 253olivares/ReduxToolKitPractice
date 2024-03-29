// redux practice 2 typescript practice
// import our slice and payload actions nanoid
import { EntityState } from "@reduxjs/toolkit";
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"; 

import { apiSlice } from "../api/apiSlice";
// import our root state for type script
import { sub } from "date-fns";
import { RootState } from "../../app/store";

// this is our state slice
// extends our type for our api request
export type initialPostStateType = oringalPostsStateType& {
        date:string,
        reactions: Record<string, number>
    }
// create a unique type for when we dont know what our json server contains
export type initialPostStateTypeUnsure = oringalPostsStateType& {
        date?:string,
        reactions?: Record<string, number>
    }
// create types for teh data we get from our api
type oringalPostsStateType = {
    id: number,
    title:string,
    body:string,
    userId:number
}
// type for out 
// @ts-ignore ignoring that our type is never used
type initialStateType = {
    ids:number[]
    entities: Record<number, initialPostStateType>
    status: 'idle'|'loading'| 'succeeded'|'failed',
    error: null | string,
    count: number
}

// adapter that will create our entities and set our ids to be the same as our post.id
// sort comparer will organize the posts by date
const postsAdapter = createEntityAdapter({
    selectId: (post: initialPostStateType) => post.id,
    sortComparer: (a,b) => b.date?.localeCompare(a.date)
})

// new state is a posts holder to all our posts
// a status to display a loader on our page when we are fetching data
// and an error state to catch any issues and display them.


// this creates an initial state which is the id and entities format
const initialState = postsAdapter.getInitialState()

console.log("initialState:",initialState);

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=> ({
        getPosts: builder.query<EntityState<initialPostStateType, number>, void>({
            // alternative to look into called query fn
            // documentation for query fn alternative 
            // https://redux-toolkit.js.org/rtk-query/api/createApi#queryfn
            query: () => '/posts',
            // transformResponse lets us change our data.
            // data that is pulled in will run through our functio first
            transformResponse: (responseData:initialPostStateTypeUnsure[]) => {
                let min = 1;
                // @ts-ignore
                const loadedPosts :initialPostStateType[] = responseData.map(post => {
                    // check to see if date exists
                    if(!post?.date) post.date = sub(new Date(), {minutes: min++}).toISOString();
                    // check to see if reactions exists
                    if(!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    // add them

                    // all our posts should have a date and reaction now
                    return post;
                })
                return postsAdapter.setAll(initialState, loadedPosts);
            },

            providesTags: (result)=>
            // make sure we have a result otherwise not need to create tags
            result ?
            [
                {type: 'Post', id:"LIST"},
                ...result.ids.map(id => ({type:'Post' as const, id}))
            ] : [{ type: 'Post', id: 'LIST' }],
        }),
        getPostsByUserId: builder.query({
            query: (id:number) => `/posts/?userId=${id}`,
            transformResponse: (responseData:initialPostStateTypeUnsure[]) => {
                let min = 1;
                // check our post again to make sure our data has a date and reaction if not add it
                
                // telling typescript to ignore the line under since we are running into an issue of setting a data type
                // since data and reactions are non existent when loading the data
                // by the time it finishes through the map this data types should exist
                // @ts-ignore
                const loadedPosts :initialPostStateType[]  = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(),  {minutes: min++}).toISOString();
                    if(!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result) => {
                // inalidate list query
                console.log(result);
                return result ? [
                    ...result.ids.map(id => ({type:'Post' as const, id}))
                ] : [{ type: 'Post', id: 'LIST' }]
            }
        }),
        addNewPost: builder.mutation({
            // if I wanted we could run qury function to mess with our arguments before we query
            query: (initialPost: {title:string, body:string,userId:number}) => ({
                url:'/posts',
                method:'POST',
                body: {
                        ...initialPost,
                        userId:Number(initialPost.userId),
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                    }
                }
            }),
            // invalidate the list to update our list cache
            invalidatesTags: [
                {type:'Post', id: "LIST"}
            ]
        }),
        updatePost: builder.mutation({
            // query taking in our args
            query: (initialPost: {id: number, title:string, body: string, userId:number, reactions: Record<string, number>})=> ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    // we are spreading our post and then assigning a new date
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            // tags let the app mark each cache data so that they can be individually updated later
            invalidatesTags: (arg) => {
                // returns our data from putting
                console.log(arg);
                return [
                    {type:'Post', id:arg.id}
                ]
            }
        }),
        deletePost: builder.mutation({
            query: ({id}) => ({
                url:`/posts/${id}`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (arg) => [
                {type:"Post", id:arg.id}
            ]
        }),
        addReaction: builder.mutation({
            query: ({postId,reactions}: {postId:number, reactions:Record<string, number>}) => ({
                url: `/posts/${postId}`,
                method: 'PATCH',
                // we want to add a user check to make sure people can only leave on reaction
                body: {reactions}
            }),
            // on query started handler takes in our params and gets our dispatch from redux and query fulfilled
            // function within is executed once the query begins
            //queryfulfilled is what checks to see if our query orks
            async onQueryStarted({postId, reactions}, {dispatch,queryFulfilled}){
                // we create a const that is our patch result that becomes a optimistic update
                const patchResult = dispatch(
                    // draft is our data and get posts calls our endpoint
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        const post = draft.entities[postId];
                        if (post) post.reactions = reactions;
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    // if our process fails undo our patch
                    patchResult.undo()
                }
            }
        })
    })
})

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiSlice;

// return query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// after getting our object
// we pass it into a selector to get our data out of our object
// This should create a normalized state object with ids and entities
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

console.log("selectPostsData:",selectPostsData)

//our select all 

// selectors to call our states in the components
// export const selectAllPosts = (state: RootState) => state.posts.posts;

// Note: https://redux-toolkit.js.org/api/createEntityAdapter

// change name of our selects that come preinstalled with reduc getSelector
// export const {
//     selectAll: selectAllPosts,
//     selectById: selectPostById,
//     selectIds: selectPostIds
//     // Pass in a selector that returns the posts slice of state
// } = postsAdapter.getSelectors((state: {posts:{
//     ids: number[],
//     entities: Record<number,initialPostStateType>,
//     status: 'idle'|'loading'| 'succeeded'|'failed',
//     error: null | string,
//     count: number
// }}) => state.posts)

console.log("GetSelectors:",postsAdapter.getSelectors());

export const  {
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors((state:RootState) => {
    // if data is null that just pass our initial state which has the id and entity structure

    return selectPostsData(state) ?? initialState
})