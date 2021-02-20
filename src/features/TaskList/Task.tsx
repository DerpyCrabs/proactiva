import { useUpdateAtom } from 'jotai/utils'
import { assoc, filter } from 'ramda'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
import { Delete, DragIndicator } from '@material-ui/icons'
import { Task, Todo, taskState, tasksState } from '../../state'

export default function TaskItem({ item, index }: { projectId: number; item: Todo; index: number }) {
  const setTasks = useUpdateAtom(tasksState)
  const setTask = useUpdateAtom(taskState(item.id))
  const [hover, setHover] = React.useState(false)
  const [editing, setEditing] = React.useState(false)
  const [taskName, setTaskName] = React.useState('')

  const changeName = () => setTask(assoc('name', taskName))

  const onDelete = () => setTasks(filter<Task>((t) => t.id !== item.id))

  const toggleCompletion = () => setTask(assoc('status', !item.status))

  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <ListItemIcon
            {...provided.dragHandleProps}
            style={{
              minWidth: '20px',
              visibility: hover ? 'visible' : 'hidden',
            }}
          >
            <DragIndicator style={{ color: '#666', fontSize: 20 }} />
          </ListItemIcon>
          <Checkbox checked={item.status} size='small' onChange={toggleCompletion} />
          <ListItemText
            disableTypography={true}
            onClick={() => {
              setTaskName(item.name)
              setEditing(true)
            }}
          >
            {editing ? (
              <TextField
                variant='outlined'
                size='small'
                autoFocus
                style={{ width: '100%' }}
                inputProps={{ style: { padding: '6px', fontSize: '16px' } }}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Escape') {
                    setEditing(false)
                  } else if (e.key === 'Enter') {
                    changeName()
                    setEditing(false)
                  }
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onBlur={(_) => setEditing(false)}
              />
            ) : (
              <Typography
                style={{
                  fontSize: '16px',
                  lineHeight: '21px',
                  color: '#eee',
                }}
              >
                {item.name}
              </Typography>
            )}
          </ListItemText>
          <IconButton
            edge='end'
            style={{
              color: '#666',
              visibility: hover ? 'visible' : 'hidden',
              padding: 6,
              marginRight: 0,
            }}
            onClick={onDelete}
          >
            <Delete />
          </IconButton>
        </ListItem>
      )}
    </Draggable>
  )
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  padding: 0,
  marginLeft: '-30px',
  width: 'calc(100% + 30px)',
  background: isDragging ? '#484' : 'unset',
  ...draggableStyle,
})
