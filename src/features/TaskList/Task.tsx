import { complement, filter, lensProp, over, propEq } from 'ramda'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Delete, DragIndicator } from '@material-ui/icons'
import { Task, projectState } from '../../state'

export default function TaskItem({
  projectId,
  item,
  index,
}: {
  projectId: number
  item: Task
  index: number
}) {
  const setProject = useSetRecoilState(projectState(projectId))
  const [hover, setHover] = React.useState(false)

  const onDelete = () =>
    setProject(
      over(lensProp('tasks'), filter(complement(propEq('id', item.id))))
    )

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
          <IconButton
            edge='end'
            style={{
              color: '#666',
              visibility: hover ? 'visible' : 'hidden',
              padding: 0,
              paddingRight: '10px',
            }}
          >
            <Delete onClick={onDelete} />
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
