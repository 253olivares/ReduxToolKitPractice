import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "../services";

export const store = configureStore({
    reducer: {
        [pokemonApi.reducerPath] : pokemonApi.reducer,
    },
    // appending our create api middleware
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(pokemonApi.middleware)
})

// optional function to set our fetchonfocus and refetchonreconnect
setupListeners(store.dispatch);