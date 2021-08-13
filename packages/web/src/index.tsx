import './index.css'

import { Provider } from 'jotai'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import {
  CssBaseline,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
  colors,
} from '@material-ui/core'
import Index from './pages/Index'

declare module '@material-ui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.blue[500],
    },
    background: {
      default: '#1f1f1f',
      paper: '#282828',
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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Provider>
            <Suspense fallback={<div>loading...</div>}>
              <Index />
            </Suspense>
          </Provider>
        </CssBaseline>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
