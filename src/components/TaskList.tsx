import React from 'react'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import {
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { Add, Delete, DragIndicator } from '@material-ui/icons'
import { Task, projectState } from '../state'

const reorder = (oldArr: Array<any>, startIndex: number, endIndex: number) => {
  let arr = oldArr.slice()
  const [removed] = arr.splice(startIndex, 1)
  arr.splice(endIndex, 0, removed)
  return arr
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  padding: 0,
  margin: `0 0 0px 0`,
  marginLeft: '-30px',
  background: isDragging ? '#484' : 'unset',
  ...draggableStyle,
})

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#444' : 'unset',
  padding: 0,
  maxWidth: '1000px',
  flexGrow: 1,
})

export default function TaskList() {
  let { id } = useParams()
  const [project, setProject] = useRecoilState(projectState(parseInt(id)))
  const setTasks = (items: Array<Task>) =>
    setProject((project) => ({ ...project, tasks: items }))

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const newTasks = reorder(
      project.tasks.slice(),
      result.source.index,
      result.destination.index
    )

    setTasks(newTasks)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#222',
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1000px',
          paddingTop: '32px',
          paddingRight: '45px',
          paddingLeft: '45px',
        }}
      >
        <Typography
          variant='h5'
          style={{ paddingLeft: '18px', paddingBottom: '10px' }}
        >
          Project name
        </Typography>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided, snapshot) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {project.tasks.map((item: any, index: number) => (
                    <React.Fragment key={item.id}>
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
                              <DragIndicator
                                style={{ color: '#666', fontSize: 20 }}
                              />
                            </IconButton>
                            <Checkbox checked={index % 3 === 1} size='small' />
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
                      <Divider />
                    </React.Fragment>
                  ))}
                  {provided.placeholder}
                  <div
                    key='add-button'
                    style={{
                      color: '#aaa',
                      padding: '8px',
                      paddingLeft: '16px',
                    }}
                  >
                    <span>
                      <Add
                        style={{
                          color: '#de4c4a',
                          fontSize: 18,
                          verticalAlign: 'middle',
                          marginRight: '8px',
                        }}
                      />
                    </span>
                    <span style={{ fontSize: 14 }}>Add task</span>
                  </div>
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}
