import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import React from 'react'
import { maxIdState, tasksState } from '../../../state'
import Activated from './Activated'
import NotActivated from './NotActivated'

export default function AddTask({ projectId }: { projectId: number }) {
  const setTasks = useUpdateAtom(tasksState)
  const maxId = useAtomValue(maxIdState)
  const [adding, setAdding] = React.useState(false)
  const addTask = (name: string) => {
    if (name.length !== 0) {
      setTasks((tasks) => [
        ...tasks,
        {
          kind: 'Todo',
          id: maxId + 1,
          name: name,
          creationDate: new Date(),
          modificationDate: new Date(),
          status: false,
          parent: projectId,
        },
      ])
      setAdding(false)
    }
  }
  if (adding) {
    return <Activated cancel={() => setAdding(false)} addTask={addTask} />
  } else {
    return <NotActivated activate={() => setAdding(true)} />
  }
}
