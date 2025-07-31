import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client"
import {Provider} from 'react-redux'
import {store, persistor} from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import './i18n.js' // Add this line to initialize i18n
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
) 