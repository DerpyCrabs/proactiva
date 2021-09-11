import type { Note, Todo } from 'common-types'
import { useUpdateAtom } from 'jotai/utils'
import { assoc } from 'ramda'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Checkbox, IconButton, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Delete, Edit, Subject } from '@mui/icons-material'
import { taskState } from '../../state'
import TaskDescription from '../TaskDescription'

const useStyles = makeStyles((theme: Theme) => ({
  task: {
    userSelect: 'none',
    background: theme.palette.grey[800],
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1.5),
    boxShadow: '1px 1px 10px 1px #222',
  },
  footer: {
    margin: theme.spacing(-1.5),
    marginTop: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {},
  iconButton: { padding: '9px', color: theme.palette.grey[400] },
  icon: { fontSize: '1.3rem' },
}))

export default function Task({
  task,
  index,
  deleteTask,
}: {
  task: Todo | Note
  index: number
  deleteTask: () => void
}) {
  const classes = useStyles()
  const setTask = useUpdateAtom(taskState(task.id))
  const [showDescriptionModal, setShowDescriptionModal] = React.useState(false)

  const renderIcon =
    task.kind === 'Todo' ? (
      <Checkbox
        checked={task.status}
        size='small'
        onChange={() => setTask(assoc('status', !task.status))}
      />
    ) : (
      <IconButton className={classes.iconButton} size="large">
        <Subject className={classes.icon} />
      </IconButton>
    )

  const renderButtons = (
    <div className={classes.buttonsWrapper}>
      <IconButton
        className={classes.iconButton}
        onClick={() => setShowDescriptionModal(true)}
        size="large">
        <Edit className={classes.icon} />
      </IconButton>
      <IconButton className={classes.iconButton} onClick={deleteTask} size="large">
        <Delete className={classes.icon} />
      </IconButton>
    </div>
  )

  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={classes.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.name}
          <div className={classes.footer}>
            {renderIcon}
            {renderButtons}
          </div>
          <TaskDescription
            id={task.id}
            isOpen={showDescriptionModal}
            close={() => setShowDescriptionModal(false)}
          />
        </div>
      )}
    </Draggable>
  )
}
