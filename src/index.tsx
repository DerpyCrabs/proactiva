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
                tasks: [
                  { kind: 'Task', id: 4, name: 'task 1', checked: false },
                  { kind: 'Task', id: 5, name: 'task 2', checked: false },
                  { kind: 'Task', id: 6, name: 'task 3', checked: true },
                  { kind: 'Task', id: 7, name: 'task 4', checked: false },
                  { kind: 'Task', id: 8, name: 'task 5', checked: false },
                  { kind: 'Task', id: 9, name: 'task 6', checked: true },
                ],
              },
              {
                kind: 'Project',
                id: 2,
                parentId: 0,
                name: 'kek-child2',
                isExpanded: false,
                tasks: [],
              },
              {
                kind: 'Project',
                id: 3,
                parentId: 1,
                name: 'kek-child1-child',
                isExpanded: false,
                tasks: [],
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
