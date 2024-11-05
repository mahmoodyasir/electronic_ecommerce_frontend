import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StyledEngineProvider } from '@mui/material'
import { GlobalStateProvider } from './state/Provider.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './Redux/app/store.ts'

createRoot(document.getElementById('root')!).render(
  <GlobalStateProvider>
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
        </Provider>
      </StyledEngineProvider>
    </StrictMode>
  </GlobalStateProvider>
)
