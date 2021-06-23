import React from 'react'
import { useAtom } from 'jotai'
import { useHistory, useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import TaskList from '../features/TaskList/TaskList'
import { taskState, usePageTitle, useSetPageTitle } from '../state'
import { useIsMobile } from '../utils'

const PageTaskList = () => {
  let { id } = useParams() as { id: string }
  const [project] = useAtom(taskState(parseInt(id)))
  const history = useHistory()
  const isMobile = useIsMobile()
  const pageTitle = usePageTitle()
  useSetPageTitle(project ? project.name : 'No such project')

  if (project === undefined) {
    history.push('/')
    return <span>Redirecting...</span>
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '1000px',
            paddingTop: '32px',
            paddingRight: '45px',
            paddingLeft: '45px',
          }}
        >
          {isMobile && (
            <Typography variant='h5' style={{ paddingBottom: '10px' }}>
              {pageTitle}
            </Typography>
          )}
          <TaskList projectId={project.id} />
        </div>
      </div>
    </>
  )
}

export default PageTaskList
