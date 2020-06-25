import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { projectsState } from './state'
import type { Project } from './state'
import Index from './views/Index'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RecoilRoot
          initializeState={({ set }) => {
            const projects: Array<Project> = [
              {
                kind: 'Project',
                id: 1,
                parentId: 0,
                name: 'kek-child1',
                isExpanded: true,
              },
              {
                kind: 'Project',
                id: 2,
                parentId: 0,
                name: 'kek-child2',
                isExpanded: false,
              },
              {
                kind: 'Project',
                id: 3,
                parentId: 1,
                name: 'kek-child1-child',
                isExpanded: false,
              },
            ]
            set(projectsState, projects)
          }}
        >
          <Index />
        </RecoilRoot>
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
