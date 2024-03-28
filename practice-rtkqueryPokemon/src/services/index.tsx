import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create our api interface
export const pokemonApi = createApi({
    // create a reducer name
    reducerPath: 'pokemonApi',
    // set baseline for our api
    baseQuery: fetchBaseQuery({
        baseUrl:'https://pokeapi.co/api/v2/'
    }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name:string) => `pokemon/${name}`
        }),
        // data coming in is way to large to type out
        getAllPokemon: builder.query<any,void>({
            query: () => `pokemon?offset=0&limit=10000`
        })
    }),
})


export const {
    useGetPokemonByNameQuery,
    useGetAllPokemonQuery,
} = pokemonApi;