import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { optic, set } from 'optics-ts'
import { append } from 'ramda'
import React from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import Dialog from '../../components/Dialog'
import { Project, maxIdState, projectsState, tasksState } from '../../state'

const useStyles = makeStyles({
  buttonLabel: {
    marginRight: '26px',
  },
})

export default function AddProject() {
  const classes = useStyles()
  const [showModal, setShowModal] = React.useState(false)
  const projects = useAtomValue(projectsState)
  const setTasks = useUpdateAtom(tasksState)
  const maxId = useAtomValue(maxIdState)
  const [parent, setParent] = React.useState(projects[0].id)
  const [name, setName] = React.useState('')

  const addProject = () => {
    if (name.length !== 0) {
      setTasks((tasks) => {
        const tasksWithNewProject = append(
          {
            kind: 'Project',
            id: maxId + 1,
            name,
            isExpanded: false,
            parent,
            tasks: [],
            history: [],
            creationDate: new Date(),
            modificationDate: new Date(),
          } as Project,
          tasks
        )
        const parentExpanded = optic<Array<Project>>()
          .find((p) => p.id === parent)
          .prop('isExpanded')
        return set(parentExpanded)(true)(tasksWithNewProject as Project[])
      })
      setShowModal(false)
      setName('')
      setParent(projects[0].id)
    }
  }

  return (
    <>
      <Button
        style={{ margin: '0 -6px', color: '#bbb', flex: '1' }}
        startIcon={<Add />}
        size='small'
        onClick={() => setShowModal(true)}
        classes={{ label: classes.buttonLabel }}
      >
        Add Project
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby='form-dialog-title'
        title={'Add Project'}
      >
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
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
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
