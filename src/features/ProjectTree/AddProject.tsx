import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { append } from 'ramda'
import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { maxIdState, projectsState, tasksState } from '../../state'

export default function AddProject() {
  const [showModal, setShowModal] = React.useState(false)
  const projects = useAtomValue(projectsState)
  const setTasks = useUpdateAtom(tasksState)
  const [maxId] = useAtom(maxIdState)
  const [parent, setParent] = React.useState(projects[0].id)
  const [name, setName] = React.useState('')

  const addProject = () => {
    if (name.length !== 0) {
      setTasks(
        append({
          kind: 'Project',
          id: maxId + 1,
          name,
          isExpanded: false,
          parent,
          tasks: [],
          history: [],
          creationDate: new Date(),
          modificationDate: new Date(),
        })
      )
      setShowModal(false)
      setName('')
      setParent(projects[0].id)
    }
  }

  return (
    <>
      <Button
        style={{ marginLeft: 14, color: '#bbb' }}
        startIcon={<Add />}
        size='small'
        onClick={(_) => setShowModal(true)}
      >
        Add Project
      </Button>
      <Dialog
        open={showModal}
        onClose={(_) => setShowModal(false)}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Project Name'
            type='text'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor='parent-select'>Parent project</InputLabel>
            <Select
              value={parent}
              onChange={(e) => setParent(e.target.value as number)}
              id='parent-select'
            >
              {projects.map(({ id, name }) => (
                <MenuItem value={id}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={(_) => setShowModal(false)} color='primary'>
            Cancel
          </Button>
          <Button color='primary' onClick={addProject}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
