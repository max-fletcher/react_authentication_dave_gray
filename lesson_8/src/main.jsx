import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Pass store into Provider so the Reducers with or without RTK will be available to App component */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* We wrapped the App component with Routes and Route tag. We will do the rest of the routing inside the App component */}
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
