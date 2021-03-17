import './index.css'

import { Provider } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'
import Index from './pages/Index'
import * as ServiceWorkerRegistration from './serviceWorkerRegistration'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[500],
    },
    background: {
      default: '#222222',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightRegular: 300,
    fontSize: 16,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Provider>
          <Index />
        </Provider>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

ServiceWorkerRegistration.register()