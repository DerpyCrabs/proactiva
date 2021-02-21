import { useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { IconButton, Menu, MenuItem, makeStyles } from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'
import { projectsState } from '../../state'
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

  const handleDelete = () => {
    setAnchorEl(null)
    setProjects((projects) =>
      projects.filter((project) => project.id !== projectId)
    )
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
        onClose={(_) => setAnchorEl(null)}
        MenuListProps={{ disablePadding: true }}
      >
        <MenuItem onClick={() => setEditModalOpen(true)}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <TaskDescription
        id={projectId}
        isOpen={editModalOpen}
        close={() => {
          setEditModalOpen(false)
          setAnchorEl(null)
        }}
      />
    </>
  )
}
