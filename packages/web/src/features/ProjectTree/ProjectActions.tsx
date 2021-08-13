import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { append, complement, equals, filter, propEq } from 'ramda'
import React from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { MoreHoriz } from '@material-ui/icons'
import { favoriteProjectIdsState, projectsState } from '../../state'
import TaskDescription from '../TaskDescription'

const useStyles = makeStyles({
  moreActions: {
    color: '#777',
    '&:hover': {
      color: 'white',
    },
  },
})

export default function ProjectActions({ projectId }: { projectId: number }) {
  const classes = useStyles()
  const [editModalOpen, setEditModalOpen] = React.useState(false)
  const setProjects = useUpdateAtom(projectsState)
  const [anchorEl, setAnchorEl] = React.useState(null as null | Element)

  const [favoriteProjectIds, setFavoriteProjectIds] = useAtom(
    favoriteProjectIdsState
  )

  const closeActions = (f: () => void): (() => void) => () => {
    setAnchorEl(null)
    f()
  }

  const handleDelete = () => {
    setProjects(filter(complement(propEq('id', projectId))))
  }

  const removeFromDashboard = () => {
    setFavoriteProjectIds(filter(complement(equals(projectId))))
  }
  const addToDashboard = () => {
    setFavoriteProjectIds(append(projectId))
  }

  return (
    <>
      <IconButton
        size='small'
        className={classes.moreActions}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreHoriz style={{ fontSize: 20 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeActions(() => {})}
        MenuListProps={{ disablePadding: true }}
      >
        <MenuItem onClick={() => setEditModalOpen(true)}>
          Edit description
        </MenuItem>
        <MenuItem onClick={closeActions(handleDelete)}>Delete project</MenuItem>
        {favoriteProjectIds.includes(projectId) ? (
          <MenuItem onClick={closeActions(removeFromDashboard)}>
            Remove from dashboard
          </MenuItem>
        ) : (
          <MenuItem onClick={closeActions(addToDashboard)}>
            Add to dashboard
          </MenuItem>
        )}
      </Menu>
      <TaskDescription
        id={projectId}
        isOpen={editModalOpen}
        close={closeActions(() => setEditModalOpen(false))}
      />
    </>
  )
}
