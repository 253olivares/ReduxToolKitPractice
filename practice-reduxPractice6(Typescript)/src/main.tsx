import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//after creating our apu slice we need to set our provider so the app can use it

import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './features/api/apiSlice.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>,
)
