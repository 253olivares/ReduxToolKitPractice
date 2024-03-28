import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create our api slice
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Post','User'],
    // @ts-ignore Builder needs to be left blank
    endpoints: builder => ({

    })
})