import { EntityState } from "@reduxjs/toolkit";

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";

import { sub } from "date-fns";

import { RootState } from "../../app/store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type user = {
    id: string,
    name: string,
    username: string,
    address: {
        street:string,
        suite:string,
        city:string,
        zipcode:string,
        geo:{
            lat:string,
            lng:string
        }
        phone:string,
        website:string,
        company: {
            name:string,
            catchPhrase: string,
            bs: string
        }
    }
}

const initialState:user[] = [

];

type userReturn = {
    id:number,
    name:string
}

export const extendedUserApiSlice = apiSlice.injectEndpoints({
    endpoints:builder => ({
        getUsers: builder.query<any, void>({
            async queryFn(_arg, _queryApi, _extraOptions, fetchUsers) {

                const result = await fetchUsers('/users');

                console.log(result);


                return result.data
                ? { data: result.data as user[] }
                : { error: result.error as FetchBaseQueryError }
            },
        }),
        getUserById:builder.query<user,number>({
            query: (id) => `/users/${id}`
        })

    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery
 } = extendedUserApiSlice;