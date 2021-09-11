import axios from 'axios'
import type {
  Id,
  NetworkState,
  Note,
  Project,
  Spreadsheet,
  Todo,
} from 'common-types'
import { WritableAtom, atom, useAtom, SetStateAction } from 'jotai'
import { focusAtom } from 'jotai/optics'
import {
  atomFamily,
  atomWithDefault,
  useAtomValue,
  useUpdateAtom,
} from 'jotai/utils'
import { useEffect } from 'react'
import { useCallback } from 'react'

const networkBaseState = atomWithDefault(async (_get) => {
  const data = localStorage.getItem('data')
  if (!data) {
    const data = await axios.get('http://localhost:4200/1')
    const user = await data.data
    const newState: NetworkState = {
      currentUserData: user,
      lastTimeSuccessfullyUpdated: new Date(),
    }
    localStorage.setItem('data', JSON.stringify(newState))
    return newState
  } else {
    const state = JSON.parse(data)
    return {
      ...state,
      lastTimeSuccessfullyUpdated: new Date(state.lastTimeSuccessfullyUpdated),
    }
  }
})
const networkState = atom<NetworkState, SetStateAction<NetworkState>>(
  (get) => get(networkBaseState),
  async (get, set, setAction) => {
    let newState
    if (typeof setAction === 'function') {
      newState = setAction(get(networkBaseState))
    } else {
      newState = setAction
    }
    localStorage.setItem('data', JSON.stringify(newState))
    set(networkBaseState, newState)
  }
)

export function useForceSync() {
  const [state, setState] = useAtom(networkState)
  const forceSync = useCallback(() => {
    const currentDate = new Date()
    axios
      .post('http://localhost:4200/1', state.currentUserData)
      .then(() => {
        setState((state) => ({
          ...state,
          lastTimeSuccessfullyUpdated: currentDate,
        }))
      })
      .catch((err) => {
        console.log(`Failed to sync user data: ${err}`)
      })
  }, [state, setState])
  return forceSync
}

export const lastSyncTimeState = atom((get) => {
  const network = get(networkState)
  return network.lastTimeSuccessfullyUpdated
})

const userState = focusAtom(networkState, (optic) =>
  optic.prop('currentUserData')
)

export const tasksState = focusAtom(userState, (optic) => optic.prop('tasks'))

export const maxIdState = atom((get) => {
  const tasks = get(tasksState)
  return Math.max(...tasks.map((t) => t.id))
})

export const taskState = atomFamily((id: Id) =>
  focusAtom(tasksState, (optic) => optic.find((t) => t.id === id))
)

export const projectTasksState = atomFamily(
  (id: Id) =>
    focusAtom(tasksState, (optic) =>
      optic.filter(
        (t) =>
          t.parent === id &&
          (t.kind === 'Todo' || t.kind === 'Note' || t.kind === 'Spreadsheet')
      )
    ) as unknown as WritableAtom<
      Array<Todo | Note | Spreadsheet>,
      SetStateAction<Array<Todo | Note | Spreadsheet>>
    >
)

export const projectsState = focusAtom(tasksState, (optic) =>
  optic.filter((t) => t.kind === 'Project')
) as unknown as WritableAtom<Project[], SetStateAction<Project[]>>

export const favoriteProjectIdsState = focusAtom(userState, (optic) =>
  optic.prop('favoriteProjects')
)

export const favoriteProjectsValue = atom<Array<Project>>((get) => {
  const projects = get(projectsState)
  const favoriteProjectIds = get(favoriteProjectIdsState)
  return favoriteProjectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p) => p !== undefined) as Array<Project>
})

export const drawerState = atom(false)

const pageTitleState = atom('Proactiva')

export function useSetPageTitle(title: string): void {
  const setPageTitle = useUpdateAtom(pageTitleState)
  useEffect(() => {
    setPageTitle(title)
  }, [setPageTitle, title])
}

export function usePageTitle(): string {
  return useAtomValue(pageTitleState)
}
