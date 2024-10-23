import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { LoaderContext } from './context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderContext>
      <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      </BrowserRouter>
    </LoaderContext>
  </StrictMode>,
)
