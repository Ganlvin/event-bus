<a href="/README.md">English</a>   
<a href="/README_CN.md">简体中文</a>



[TOC]

# 什么是事件总线(EventBUs)

事件总线这个概念对你来说可能很陌生，但提到观察者（发布-订阅）模式，你也许就很熟悉。事件总线是对发布-订阅模式的一种实现。如果你是小白，还是不理解，没关系，你可以用 在DOM 中的 **addEventListener** 参考

```js
// 在 DOM 中绑定事件，click、mouseover 这些，都是内置规定好的事件名称。
// 第一个参数就是绑定的事件名称；第二参数是一个函数，就是订阅者。
// 当 dom 发布 click 事件 时，函数（订阅者）就会调用
document.addEventListener('click',()=>{})
 
```

以上代码 在这个库 的表现形式 就是

```js
// 订阅事件  就像 document.addEventListener('click',()=>{})
EventBus.on('custom', () => {})
// 发布事件 -> 订阅时传入的函数会被调用
EventBus.emit('custom')
```

让我们开始吧

# 怎么使用

## 1、npm安装依赖

```shell
npm install @onpaper/event-bus
```

## 2、将包导入

### Node 环境    

JavaScript 文件中 写入下面代码

```js
// es module
import pkg from "@onpaper/event-bus";
const { EventBus } = pkg;

// commonjs
const { EventBus } = require("@onpaper/event-bus");
```

### TypeScript

如果你使用的 TypeScript

```js
import { EventBus } from "@onpaper/event-bus";
```

## 3、使用例子

### 基本使用

```js
const appleCallBack = (payload) => {
  console.log(payload) // -> appleCallBack
}

// 订阅 apple 事件
eventBus.on('apple', appleCallBack)
// 发送 一个payload参数
eventBus.emit('apple', 'appleCallBack')
```

### 发送多个 payload 参数

```js
const orangeCallBack = (...payload) => {
  console.log(payload) // -> [ 'orange', 'callBack' ]
}

// 订阅 orange 事件
eventBus.on('orange', orangeCallBack)
// 发送多个参数 'orange', 'callBack'
eventBus.emit('orange', 'orange', 'callBack')
```

### once 方法 

只监听一次事件

```js
// 只监听一次
let onlyChangeOne = 0
const bananaCallBack = () => {
  onlyChangeOne++
  console.log('banana')
}
eventBus.once('banana', bananaCallBack)
eventBus.emit('banana') // -> banana 
eventBus.emit('banana') // -> 无函数调用
console.log('onlyChangeOne')  // ->  1
```

### 取消事件监听

#### 方法一： 调用 off 方法

```js
// 取消监听
let onlyAddOne = 0
const strawberryCallBack1 = () => {
  console.log('strawberryCallBack1')
  onlyAddOne++
}
const strawberryCallBack2 = () => {
  console.log('strawberryCallBack2')  // no console.log
  onlyAddOne++
}
eventBus.on('strawberry', strawberryCallBack1)
eventBus.on('strawberry', strawberryCallBack2)

// 传入取消事件  和 之前订阅的函数
eventBus.off('strawberry', strawberryCallBack1)

eventBus.emit('strawberry')

// strawberryCallBack2 无调用
console.log(onlyAddOne) // 1
```

#### 方法二 ：on 返回取消函数

```js
// 取消监听
let onlyAddOne = 0
const strawberryCallBack1 = () => {
  console.log('strawberryCallBack1')
  onlyAddOne++
}
const strawberryCallBack2 = () => {
  console.log('strawberryCallBack2')  // no console.log
  onlyAddOne++
}

// on 返回 取消函数
const offStrawberry1 = eventBus.on('strawberry', strawberryCallBack1)
eventBus.on('strawberry', strawberryCallBack2)

// 调用取消函数 可取消监听事件
offStrawberry1()

eventBus.emit('strawberry')
console.log(onlyAddOne) // 1
```

## 4、TypeScript 支持

```js
//定义事件名字 获得更好的类型提示
type evenName = 'apple' | 'orange' | 'banana' | 'strawberry'

const eventBus = new EventBus<evenName>()

// 第一个参数 事件名字 必须是 evenName 定义的
// 会有提示 事件名字
eventBus.on("", ()=>{})
eventBus.ones("", ()=>{})
eventBus.emit("", ()=>{})
eventBus.off("", ()=>{})
```

使用愉快~