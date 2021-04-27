export interface IUserInfo {
  id: number
  firstname: string
  lastname: string
  username: string
  email: string
}

export interface IUpdateUserInfo {
  id: number
  firstname?: string
  lastname?: string
  username: string
  email: string
}