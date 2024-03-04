import { configureStore } from "@reduxjs/toolkit";

import counterReducer from '../../features/counter/counterSlice'

// this is how we create a store in redux tool kit
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});