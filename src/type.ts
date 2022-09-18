export type CallbackType = {
  (...payload: any[]): any
}

export type HandlersType = {
  eventCallback: CallbackType
  thisArg: any
}

export type IEventBus<T extends string | number | symbol> = {
  [key in T]: HandlersType[]
}
