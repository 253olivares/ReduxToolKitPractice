// our counter component

import React from 'react'
// call our selector so we can access data and dispatcher to manipulate data
import { useSelector, useDispatch } from 'react-redux'
// import our actions that well be using in dispatch
import { increment, decrement,reset,incrementByAmount } from './counterSlice';
import {useState} from 'react';

const Counter = () => {
    // counter takes on our state
    const count = useSelector((state) => state.counter.count);
    // dispatch takes our our use dispatch function
    // just to rename it
    const dispatch = useDispatch();

    // a unique state for our component so that it can keep track of user input 
    const [incrementAmount, setIncrementAmount] = useState(0);

    // each time our component re renders we set our add value 
    // we convert our incrementAmount from a string to a number
    // if it cant then it auto makes it to a 0
    const addValue = Number(incrementAmount) || 0;

    // a reset function that will change our number to 0 when the user clicks on it
    const resetAll = () => {
        // set our state to zero
        setIncrementAmount(0);
        // run our reset dispatch function
        dispatch(reset());
    }

  return (
    // a section div
    <section>
        {/* p tag that displays our count whenever the component rerenders */}
        <p>{count}</p>
        {/* here we render our buttons that will add 1 or subtract 1 when the user clicks on it */}
        <div>
            <button onClick={()=> dispatch(increment())}>+</button>
            <button onClick={()=> dispatch(decrement())}>-</button>
        </div>
        {/* input field that takes in our incrementAmount and runs an onchange function that sets our incrementAmount when it changes */}
        <input 
            type='text'
            value={incrementAmount}
            // passes our e.target.value
            onChange={(e)=> setIncrementAmount(e.target.value)}
        />

        <div>   
            {/* two buttons to pass our increment amount value to our dispatch to add the number to that state */}
            <button onClick={()=> dispatch(incrementByAmount(addValue))}>Add Amount</button>
            {/* a reset all button */}
            <button onClick={resetAll}>Reset</button>
        </div>
        {
            // render a message at the bottom depending on what the user enters for our input
            // if it is a number then nothing
            // if it is a 0 do nothing
            // if it is a empty string do nothing
            // anything else display a message that tells the user to input a number
            !Number(incrementAmount) && incrementAmount !== 0 && incrementAmount !== "" ? "Please input a number!" : ""
        }
    </section>
  )
} 

export default Counter