import { RecoilState, atom, selector, selectorFamily } from 'recoil'

export interface Task {
  kind: 'Task'
  id: number
  name: string
  checked: boolean
}
export interface Project {
  kind: 'Project'
  id: number
  name: string
  isExpanded: boolean
  parentId: number
  tasks: Array<Task>
}

export const projectsState = atom({
  key: 'projects',
  default: [
    { name: 'Root', id: 0, isExpanded: false, parentId: 0, kind: 'Project' },
  ] as Array<Project>,
})

export const rootState = selector({
  key: 'root',
  get: ({ get }) => 0,
})

export const maxIdState = selector({
  key: 'maxId',
  get: ({ get }) => {
    const projects = get(projectsState)
    return Math.max(
      ...projects.flatMap((project) => [
        project.id,
        ...project.tasks.map((t) => t.id),
      ])
    )
  },
})

export const projectState = selectorFamily({
  key: 'project',
  get: (projectId: number) => ({ get }) => {
    const projects = get(projectsState)
    const project = projects.find((project) => project.id === projectId)
    if (project === undefined)
      throw new Error(`Failed to find project with id ${projectId}`)
    return project
  },
  set: (projectId: number) => ({ set, get }, newValue) => {
    set(projectsState, (projects) =>
      projects.reduce(
        (acc, val) => [
          ...acc,
          val.id === projectId ? (newValue as Project) : val,
        ],
        [] as Array<Project>
      )
    )
  },
}) as (param: number) => RecoilState<Project>
