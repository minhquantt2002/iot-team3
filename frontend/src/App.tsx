import React from "react"
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"

import Routes from './routes'
import store from './store'
import ThemeCustomization from "./themes"

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter basename="/">
        <ThemeCustomization>
          <Routes />
        </ThemeCustomization>
      </BrowserRouter>
    </Provider >
  )
}

export default App
