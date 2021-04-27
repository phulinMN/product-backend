export interface IMessage {
  message: string
  args?: {
    id: number
    params: string
  }
}