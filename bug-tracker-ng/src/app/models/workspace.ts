export interface Workspace {
  _id?: string,
  name: string,
  owner: string,
  date?: Date,
  permissions?: string[]
}