import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// our store
import { store } from './app/store/index.jsx'
// our provider
// same way as react context we call our provider and wrap it around our component we want to have access.
// easiest example is wrapping our app dom that sits at the top of our tree so that all sequential doms that follow can access our store.
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
