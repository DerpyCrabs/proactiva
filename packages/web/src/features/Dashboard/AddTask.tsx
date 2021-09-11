import type { Id, Note, Task, Todo } from 'common-types'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { append } from 'ramda'
import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, TextField, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Add } from '@mui/icons-material'
import { maxIdState, tasksState } from '../../state'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    color: theme.palette.grey['A200'],
    margin: '0 0 10px 16px',
  },
  buttonLabel: {
    marginRight: '22px',
  },
  buttonStartIcon: {
    marginRight: '4px',
  },
}))

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
        className={classes.button}
        classes={{
          label: classes.buttonLabel,
          startIcon: classes.buttonStartIcon,
        }}
        startIcon={<Add />}
        size='small'
        onClick={() => setShowModal(true)}
      >
        Add Task
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby='form-dialog-title'
        title={'Add Task'}
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
