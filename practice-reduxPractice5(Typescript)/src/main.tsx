import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from './app/store.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// crud application created in react using typescript. 
// this module is a follow along tutorial that I am practicing translating javascript into typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store= {store}>
    <Router>
      <Routes>
        <Route path='/*' element={<App />}/>
      </Routes>
    </Router>
  </Provider>,
)
