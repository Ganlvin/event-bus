import { EventBus } from '../src/index'

//定义事件名字 更好的类型支持
type evenName = 'apple' | 'orange' | 'banana' | 'strawberry'

const eventBus = new EventBus<evenName>()

// 发送一个参数
const appleCallBack = (payload: string) => {
  if (payload !== 'appleCallBack') {
    throw new Error('appleCallBack error')
  }
  console.log(payload) // -> appleCallBack
}

eventBus.on('apple', appleCallBack)
eventBus.emit('apple', 'appleCallBack')

// 发送多个参数
const orangeCallBack = (...payload: any[]) => {
  if (!(payload.includes('orange') && payload.includes('callBack'))) {
    throw new Error('orangeCallBack error')
  }
  console.log(payload) // -> [ 'orange', 'callBack' ]
}

eventBus.on('orange', orangeCallBack)
eventBus.emit('orange', 'orange', 'callBack')

// 只监听一次
let onlyChangeOne = 0
const bananaCallBack = () => {
  onlyChangeOne++
  console.log('banana')
}
eventBus.once('banana', bananaCallBack)
eventBus.emit('banana') // -> banana
eventBus.emit('banana') // ->  无
if (onlyChangeOne !== 1) {
  throw new Error('banana error')
}

// 取消监听
let onlyAddOne = 0
const strawberryCallBack1 = () => {
  onlyAddOne++
}
const strawberryCallBack2 = () => {
  onlyAddOne++
}
const offStrawberry1 = eventBus.on('strawberry', strawberryCallBack1)
eventBus.on('strawberry', strawberryCallBack2)

// 取消事件 对应的 函数
eventBus.off('strawberry', strawberryCallBack1)
// offStrawberry1()

eventBus.emit('strawberry')
console.log(onlyAddOne) // 1
if (onlyAddOne !== 1) {
  throw new Error('strawberry error')
}
