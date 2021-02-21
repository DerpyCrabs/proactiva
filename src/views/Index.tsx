import { useAtomValue } from 'jotai/utils'
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import ProjectTree from '../features/ProjectTree/ProjectTree'
import TaskList from '../features/TaskList/TaskList'
import { projectsState } from '../state'
import NoProjectsExist from './NoProjectsExist'

export default function Index() {
  const projects = useAtomValue(projectsState)
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <ProjectTree />
        <Switch>
          {projects.length !== 1 ? (
            <Route exact path='/'>
              <Redirect to={`/${projects[1].id}`} />
            </Route>
          ) : (
            <Route exact path='/' children={<NoProjectsExist />} />
          )}
          <Route path='/:id' children={<TaskList />} />
        </Switch>
      </div>
    </Router>
  )
}
