import React from 'react'
import { Button, ClickAwayListener, TextField } from '@mui/material'

export default function Activated({
  cancel,
  addNote,
  addTodo,
  addSpreadsheet,
}: {
  cancel: () => void
  addNote: (name: string) => void
  addTodo: (name: string) => void
  addSpreadsheet: (name: string) => void
}) {
  const [name, setName] = React.useState('')
  return (
    <ClickAwayListener onClickAway={cancel}>
      <div
        style={{
          color: '#aaa',
          padding: '8px',
          paddingLeft: '0px',
          paddingTop: '0px',
          flexGrow: 1,
        }}
      >
        <div>
          <div style={{ padding: '6px', paddingLeft: 0, paddingRight: 0 }}>
            <TextField
              variant='outlined'
              size='small'
              autoFocus
              style={{ width: '100%' }}
              inputProps={{ style: { padding: '6px' } }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Escape') {
                  setName('')
                  cancel()
                } else if (e.key === 'Enter') {
                  addTodo(name)
                }
                e.preventDefault()
                e.stopPropagation()
              }}
            />
          </div>
          <div style={{ padding: '0px' }}>
            <Button
              variant='contained'
              size='small'
              disabled={name.length === 0}
              onClick={() => {
                addTodo(name)
                setName('')
              }}
            >
              Add Todo
            </Button>
            <Button
              variant='contained'
              size='small'
              disabled={name.length === 0}
              style={{ marginLeft: '14px' }}
              onClick={() => {
                addNote(name)
                setName('')
              }}
            >
              Add Note
            </Button>
            <Button
              variant='contained'
              size='small'
              disabled={name.length === 0}
              style={{ marginLeft: '14px' }}
              onClick={() => {
                addSpreadsheet(name)
                setName('')
              }}
            >
              Add Spreadsheet
            </Button>
            <Button
              onClick={cancel}
              size='small'
              style={{
                color: '#aaa',
                marginLeft: '6px',
                fontFamily: 'Exo 2 rev=1',
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  )
}
