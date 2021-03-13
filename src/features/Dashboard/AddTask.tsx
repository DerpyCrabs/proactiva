import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { append } from 'ramda'
import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Id, Note, Task, Todo, maxIdState, tasksState } from '../../state'

const useStyles = makeStyles({
  buttonLabel: {
    marginRight: '26px',
  },
})

export default function AddTask({ projectId }: { projectId: Id }) {
  const classes = useStyles()
  const [showModal, setShowModal] = React.useState(false)
  const maxId = useAtomValue(maxIdState)
  const [name, setName] = React.useState('')
  const setTasks = useUpdateAtom(tasksState)

  const addTask = (task: Task) => {
    if (task.name.length !== 0) {
      setTasks(append(task))
      setName('')
      setShowModal(false)
    }
  }
  const addTodo = () =>
    addTask({
      kind: 'Todo',
      id: maxId + 1,
      name: name,
      creationDate: new Date(),
      modificationDate: new Date(),
      status: false,
      parent: projectId,
    } as Todo)
  const addNote = () =>
    addTask({
      kind: 'Note',
      id: maxId + 1,
      name: name,
      creationDate: new Date(),
      modificationDate: new Date(),
      parent: projectId,
    } as Note)

  return (
    <>
      <Button
        style={{ margin: '0 -6px', color: '#bbb', flex: '1' }}
        startIcon={<Add />}
        size='small'
        onClick={() => setShowModal(true)}
        classes={{ label: classes.buttonLabel }}
      >
        Add Task
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
        </DialogContent>
        <DialogActions>
          <Button onClick={(_) => setShowModal(false)} color='primary'>
            Cancel
          </Button>
          <Button color='primary' onClick={addTodo}>
            Add Todo
          </Button>
          <Button color='primary' onClick={addNote}>
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
