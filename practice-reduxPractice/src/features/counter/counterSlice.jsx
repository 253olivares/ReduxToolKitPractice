import { createSlice } from "@reduxjs/toolkit";

// this is a slice this how redux manages states
// we create mutliple slices and then bring them together in our store to create a complete state
const initialState = {
    count: 0
}

// we create a slice providing a name
// setting our state
// and the making an object of our reducers that will mutate our state
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count+= 1;
        },
        decrement: (state) => {
            state.count-= 1;
        },
        reset: (state) => {
            state.count = 0
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        }
    }
});

// we export our functions and reducer
export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;