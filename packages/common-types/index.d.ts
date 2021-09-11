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

export interface Spreadsheet extends Task {
  kind: 'Spreadsheet'
  data: Array<{ value: string } | undefined>[]
}

export interface Note extends Task {
  kind: 'Note'
}

export interface User {
  email: string
  name: string
  tasks: Array<Task>
  favoriteProjects: Array<Id>
}

export interface NetworkState {
  lastTimeSuccessfullyUpdated?: Date
  currentUserData: User
}
