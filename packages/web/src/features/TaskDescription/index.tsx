import type { Id, Spreadsheet, Task } from 'common-types'
import { useAtom } from 'jotai'
import { lensProp, set } from 'ramda'
import React from 'react'
import { DialogContent, DialogContentText, TextField } from '@mui/material'
import Dialog from '../../components/Dialog'
import { taskState } from '../../state'
import { isSpreadsheet } from '../../utils'
const DescriptionEditor = React.lazy(() => import('./DescriptionEditor'))
const SpreadsheetEditor = React.lazy(() => import('./SpreadsheetEditor'))

export default function TaskDescription({
  id,
  isOpen,
  close,
}: {
  id: Id
  isOpen: boolean
  close: () => void
}) {
  const [task, setTask] = useAtom(taskState(id))

  if (task === undefined) {
    close()
    return <div>Failed to find task with id {id}</div>
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => close()}
      aria-labelledby='form-dialog-title'
      title={`Edit ${task.kind.toLocaleLowerCase()} "${task.name}"`}
      fullWidth
    >
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Title'
          type='text'
          fullWidth
          value={task.name}
          onChange={(e) => setTask(set(lensProp('name'), e.target.value))}
        />
        {isSpreadsheet(task) ? (
          <SpreadsheetEditor
            data={task.data || []}
            setData={(e) =>
              setTask(
                set<Spreadsheet, Spreadsheet['data']>(
                  lensProp('data'),
                  e
                ) as unknown as Task
              )
            }
          />
        ) : (
          <DescriptionEditor
            description={task.description || ''}
            setDescription={(e) => setTask(set(lensProp('description'), e))}
          />
        )}

        <DialogContentText style={{ paddingTop: '10px' }}>
          Creation date: {task.creationDate.toLocaleString()}
        </DialogContentText>
        <DialogContentText>
          Modification date: {task.modificationDate.toLocaleString()}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
