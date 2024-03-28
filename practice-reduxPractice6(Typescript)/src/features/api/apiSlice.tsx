import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { todo } from "../TodoList";

export const apiSlice = createApi ({
    // folder name
    reducerPath: "api",
    // fetchbasequery locate our base url
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500"}),
    // to make sure all our data updates we need to invalidate our todos
    // we create a tag for our cache
    // this call this tag whenever we want to provide or invalidate our cache
    // this tells rtk qury our state needs to be updated so our page changes
    tagTypes: ['Todos'],
    // create our endpoints
    endpoints: (builder) => ({
        // at todos endpoint we grab all our data
        getTodos: builder.query<todo[],void>({
            // query our data
            query: () => '/todos',
            // transform our data before we cache
            // for this transformation we are changing the order for our items
            transformResponse: (res:todo[]) => { console.log("Showing our res:",res); return res.sort((a,b) => Number(b.id) - Number(a.id))},
            // provide a tag for our cache
            providesTags:['Todos']
        }),
        // create a add todo mutation
        addTodo: builder.mutation({
            // for this query we will point torwards our /todos and passing a post
            // we pass our todo data to add to our data
            query: (todo:todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            // invalidate tags tells rtk we want to clear our previous cache as that data now is invalid
            invalidatesTags:['Todos']
        }),
        // update todo we are telling rtk we want to mutate our todos
        updateTodo: builder.mutation({
            query:(todo:todo)=> ({
                // the url we will be targeting
                url:`/todos/${todo.id}`,
                // the method we are using which is patch
                method: 'PATCH',
                // data we are passing
                body:todo
            }),
            // invalidate our cache
            invalidatesTags:['Todos']
        }),
        // delete todo
        deleteTodo: builder.mutation({
            // pass our id
            query: ({id}:{id:string})=> ({
                // target todos/id of our endpoint
                url: `/todos/${id}`,
                // tell it we want to delete
                method:'DELETE',
                // pass our id in our body
                body:id
            }),
            // invalidate our cache
            invalidatesTags:['Todos']
        })
    })
})

// export our auto generated hooks from our create api
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice