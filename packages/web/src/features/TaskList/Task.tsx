import type { Note, Spreadsheet, Task, Todo } from 'common-types'
import { useUpdateAtom } from 'jotai/utils'
import { assoc, filter } from 'ramda'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Delete,
  DragIndicator,
  Edit,
  Subject,
  ViewQuilt,
} from '@mui/icons-material'
import Input from '../../components/Input'
import { taskState, tasksState } from '../../state'
import TaskDescription from '../TaskDescription'

export default function TaskItem({
  item,
  index,
}: {
  projectId: number
  item: Todo | Note | Spreadsheet
  index: number
}) {
  const setTasks = useUpdateAtom(tasksState)
  const setTask = useUpdateAtom(taskState(item.id))
  const [hover, setHover] = React.useState(false)
  const [showEditModal, setShowEditModal] = React.useState(false)

  const onDelete = () => setTasks(filter<Task>((t) => t.id !== item.id))

  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
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
          {item.kind === 'Todo' ? (
            <Checkbox
              checked={item.status}
              size='small'
              onChange={() => setTask(assoc('status', !item.status))}
            />
          ) : item.kind === 'Spreadsheet' ? (
            <ViewQuilt
              style={{
                height: '40.84px',
                width: '40.84px',
                padding: '9px',
                color: '#cecece',
              }}
            />
          ) : (
            <Subject
              style={{
                height: '40.84px',
                width: '40.84px',
                padding: '9px',
                color: '#cecece',
              }}
            />
          )}
          <ListItemText disableTypography={true}>
            <Input
              fullWidth
              value={item.name}
              onChange={(e) => setTask(assoc('name', e.target.value))}
              onKeyUp={(e) => {
                if (e.key === 'Escape') {
                  ;(e.target as HTMLTextAreaElement).blur()
                } else if (e.key === 'Enter') {
                  ;(e.target as HTMLTextAreaElement).blur()
                }
                e.preventDefault()
                e.stopPropagation()
              }}
            />
          </ListItemText>
          <IconButton
            edge='end'
            style={{
              color: '#666',
              visibility: hover ? 'visible' : 'hidden',
              padding: 4,
              marginRight: 0,
              marginLeft: 8,
            }}
            onClick={() => setShowEditModal(true)}
            size='large'
          >
            <Edit style={{ fontSize: '1.4rem' }} />
          </IconButton>
          <IconButton
            edge='end'
            size='small'
            style={{
              color: '#666',
              visibility: hover ? 'visible' : 'hidden',
              padding: 4,
              marginRight: 0,
            }}
            onClick={onDelete}
          >
            <Delete style={{ fontSize: '1.4rem' }} />
          </IconButton>
          <TaskDescription
            id={item.id}
            isOpen={showEditModal}
            close={() => {
              setShowEditModal(false)
              setHover(false)
            }}
          />
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
