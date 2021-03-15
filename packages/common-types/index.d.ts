export type Id = number

export interface Task {
  id: Id
  name: string
  description?: string
  creationDate: Date
  modificationDate: Date
  parent?: Id
  kind: string
}

export interface Todo extends Task {
  kind: 'Todo'
  status: boolean
}

export interface Project extends Task {
  kind: 'Project'
  history: Array<{ task: Task; deleted: Date }>
  isExpanded: boolean
}

export interface Note extends Task {
  kind: 'Note'
}

export interface User {
  email: string
  name: string
  token: null | string
  tasks: Array<Task>
  favoriteProjects: Array<Id>
}
