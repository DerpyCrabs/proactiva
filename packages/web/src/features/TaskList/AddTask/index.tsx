import type { Note, Spreadsheet, Task, Todo } from 'common-types'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { append } from 'ramda'
import React from 'react'
import { maxIdState, tasksState } from '../../../state'
import { generateSpreadsheetData } from '../../../utils'
import Activated from './Activated'
import NotActivated from './NotActivated'

export default function AddTask({ projectId }: { projectId: number }) {
  const setTasks = useUpdateAtom(tasksState)
  const maxId = useAtomValue(maxIdState)
  const [adding, setAdding] = React.useState(false)
  const addTask = (task: Task) => {
    if (task.name.length !== 0) {
      setTasks(append(task))
      setAdding(false)
    }
  }

  const addTodo = (name: string) =>
    addTask({
      kind: 'Todo',
      id: maxId + 1,
      name: name,
      creationDate: new Date(),
      modificationDate: new Date(),
      status: false,
      parent: projectId,
    } as Todo)
  const addNote = (name: string) =>
    addTask({
      kind: 'Note',
      id: maxId + 1,
      name: name,
      creationDate: new Date(),
      modificationDate: new Date(),
      parent: projectId,
    } as Note)
  const addSpreadsheet = (name: string) =>
    addTask({
      kind: 'Spreadsheet',
      id: maxId + 1,
      name: name,
      creationDate: new Date(),
      modificationDate: new Date(),
      parent: projectId,
      data: generateSpreadsheetData({ rows: 20, columns: 30 }),
    } as Spreadsheet)

  if (adding) {
    return (
      <Activated
        cancel={() => setAdding(false)}
        addTodo={addTodo}
        addNote={addNote}
        addSpreadsheet={addSpreadsheet}
      />
    )
  } else {
    return <NotActivated activate={() => setAdding(true)} />
  }
}
