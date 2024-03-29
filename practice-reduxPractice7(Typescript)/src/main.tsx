import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {store} from './app/store.tsx'
import { extendedApiSlice } from "./features/post/postSlice.tsx"
import { extendedUserApiSlice } from "./features/users/userSliceAPI.ts"

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(extendedUserApiSlice.endpoints.getUsers.initiate());

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
