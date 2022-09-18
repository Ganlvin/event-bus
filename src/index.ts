import { IEventBus, CallbackType } from './type'
import { isObjectKey, isFunction } from './utils'
class EventBus<T extends string | number | symbol> {
  eventBus: IEventBus<T>
  constructor() {
    this.eventBus = {} as IEventBus<T>
  }
  /**
   * 添加监听事件
   * @param eventName 要监听的时间名称
   * @param eventCallback 当监听到事件后的回调函数
   * @param thisArg 回调函数绑定的 this
   */
  on(
    eventName: keyof IEventBus<T>,
    eventCallback: CallbackType,
    thisArg?: any
  ) {
    if (!isObjectKey(eventName)) {
      throw new TypeError('the event name must be string or number type')
    }

    if (!isFunction(eventCallback)) {
      throw new TypeError('the event callback must be function type')
    }

    let handlers = this.eventBus[eventName]
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }

    handlers.push({
      eventCallback,
      thisArg
    })
    return () => {
      this.off(eventName, eventCallback)
    }
  }

  /**
   * 只监听事件一次
   * @param eventName 要监听的时间名称
   * @param eventCallback 当监听到事件后的回调函数
   * @param thisArg 回调函数绑定的 this
   */
  once(
    eventName: keyof IEventBus<T>,
    eventCallback: CallbackType,
    thisArg?: any
  ) {
    if (!isObjectKey(eventName)) {
      throw new TypeError('the event name must be string or number type')
    }

    if (!isFunction(eventCallback)) {
      throw new TypeError('the event callback must be function type')
    }

    //包裹一个 取消监听事件，第一次响应时 直接取消监听
    const tempCallback = (...payload: any[]) => {
      this.off(eventName, tempCallback)
      eventCallback.apply(thisArg, payload)
    }

    return this.on(eventName, tempCallback, thisArg)
  }

  /**
   * 发出事件
   * @param eventName 发出的事件名称
   * @param payload 携带的参数 可在监听事件时传入的函数中获取到
   */
  emit(eventName: keyof IEventBus<T>, ...payload: any[]) {
    if (!isObjectKey(eventName)) {
      throw new TypeError('the event name must be string or number type')
    }

    const handlers = this.eventBus[eventName] || []
    handlers.forEach(handler => {
      handler.eventCallback.apply(handler.thisArg, payload)
    })
    return this
  }
  /**
   * 取消监听事件
   * @param eventName 取消的事件名字
   * @param eventCallback 传入要取消的回调函数
   */
  off(eventName: keyof IEventBus<T>, eventCallback: CallbackType) {
    if (!isObjectKey(eventName)) {
      throw new TypeError('the event name must be string or number type')
    }

    if (!isFunction(eventCallback)) {
      throw new TypeError('the event callback must be function type')
    }

    const handlers = this.eventBus[eventName]
    if (handlers && eventCallback) {
      const newHandlers = [...handlers]
      for (let i = 0; i < newHandlers.length; i++) {
        const handler = newHandlers[i]
        if (handler.eventCallback === eventCallback) {
          const index = handlers.indexOf(handler)
          handlers.splice(index, 1)
        }
      }
    }

    if (handlers.length === 0) {
      delete this.eventBus[eventName]
    }
  }
}

export { EventBus }
