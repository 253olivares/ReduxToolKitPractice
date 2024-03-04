import React from 'react'
import './App.css'
import Counter from './features/counter/Counter'

// nothing unique in our router just our counter that we call and put together our app in this file
function App() {

  return (
    <React.Fragment>
      <Counter />
    </React.Fragment>
  )
}

export default App
