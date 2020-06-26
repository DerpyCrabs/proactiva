import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Delete, DragIndicator } from '@material-ui/icons'
import { Task } from '../../state'

export default function TaskItem({
  item,
  index,
}: {
  item: Task
  index: number
}) {
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
        >
          <IconButton
            {...provided.dragHandleProps}
            style={{
              padding: '9px',
              paddingLeft: '18px',
              paddingRight: '0px',
            }}
          >
            <DragIndicator style={{ color: '#666', fontSize: 20 }} />
          </IconButton>
          <Checkbox checked={item.checked} size='small' />
          <ListItemText disableTypography={true}>
            <Typography
              style={{
                fontSize: '14px',
                lineHeight: '21px',
                color: '#eee',
              }}
            >
              {item.name}
            </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton edge='end' style={{ color: '#666' }}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </Draggable>
  )
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  padding: 0,
  margin: `0 0 0px 0`,
  marginLeft: '-30px',
  background: isDragging ? '#484' : 'unset',
  ...draggableStyle,
})
