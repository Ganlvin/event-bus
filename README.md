<a href="/README.md">English</a>   
<a href="/README_CN.md">简体中文</a>


- [what is EventBus ?](#what-is-eventbus-)
- [how to use](#how-to-use)
  - [1、npm Install dependencies](#1npm-install-dependencies)
  - [2、import package](#2import-package)
    - [Node](#node)
    - [TypeScript](#typescript)
  - [3、Example of use](#3example-of-use)
    - [basic use](#basic-use)
    - [Send multiple payload parameters](#send-multiple-payload-parameters)
    - [once method](#once-method)
    - [Cancel event listener](#cancel-event-listener)
      - [Method 1](#method-1)
      - [Method 2](#method-2)
  - [4、TypeScript support](#4typescript-support)


# what is EventBus ?

The idea of an event-bus may be strange to you，But when if i say the observer (publish-subscribe) pattern, you may be familiar. The event bus is an implementation of the publish-subscribe pattern。If you are a novice and still don't understand, it doesn't matter, you can use **addEventListener** in DOM for reference

```js
// Binding events in the DOM, click, mouseover, these are all built-in specified event names.
// The first parameter is the name of the event to be bound; the second parameter is a function, which is the subscriber.
// When the dom publishes the click event, the function (subscriber) is called
document.addEventListener('click',()=>{})
 
```

The expression of the above code in this library

```js
// Subscribing to events is like  document.addEventListener('click',()=>{})
EventBus.on('custom', () => {})
// publish event -> The passed in function will be called
EventBus.emit('custom')
```

let's start

# how to use

## 1、npm Install dependencies

```shell
npm install @onpaper/event-bus
```

## 2、import package

### Node  

 Write the following code in the JavaScript file

```js
// es module
import pkg from "@onpaper/event-bus";
const { EventBus } = pkg;

// commonjs
const { EventBus } = require("@onpaper/event-bus");
```

### TypeScript

if you use TypeScript

```js
import { EventBus } from "@onpaper/event-bus";
```

## 3、Example of use

### basic use

```js
const appleCallBack = (payload) => {
  console.log(payload) // -> appleCallBack
}

// subscription "apple" event
eventBus.on('apple', appleCallBack)
// Send a payload parameter  "appleCallBack"
eventBus.emit('apple', 'appleCallBack')
```

### Send multiple payload parameters

```js
const orangeCallBack = (...payload) => {
  console.log(payload) // -> [ 'orange', 'callBack' ]
}

// subscription orange event
eventBus.on('orange', orangeCallBack)
// send multiple parameters 'orange', 'callBack'
eventBus.emit('orange', 'orange', 'callBack')
```

### once method 

Only listen for an event once

```js
// Only listen for an event once
let onlyChangeOne = 0
const bananaCallBack = () => {
  onlyChangeOne++
  console.log('banana')
}
eventBus.once('banana', bananaCallBack)
eventBus.emit('banana') // -> banana 
eventBus.emit('banana') // -> no function call
console.log('onlyChangeOne')  // ->  1
```

### Cancel event listener

#### Method 1

Call the off method

```js
// cancel listening example
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

// Pass in cancel event and previously subscribed function
eventBus.off('strawberry', strawberryCallBack1)

eventBus.emit('strawberry')

// strawberryCallBack2 no call
console.log(onlyAddOne) // 1
```

#### Method 2

Use the cancel function returned by the on method

```js
// cancel listening example
let onlyAddOne = 0
const strawberryCallBack1 = () => {
  console.log('strawberryCallBack1')
  onlyAddOne++
}
const strawberryCallBack2 = () => {
  console.log('strawberryCallBack2')  // no console.log
  onlyAddOne++
}

// on method return cancel function
const offStrawberry1 = eventBus.on('strawberry', strawberryCallBack1)
eventBus.on('strawberry', strawberryCallBack2)

// Call the cancel function to cancel the listening event
offStrawberry1()

eventBus.emit('strawberry')
console.log(onlyAddOne) // 1
```

## 4、TypeScript support

```js
//Define the event name to get better type hints
type evenName = 'apple' | 'orange' | 'banana' | 'strawberry'

const eventBus = new EventBus<evenName>()

// The first parameter event name must be defined by evenName
// There will be hints here
eventBus.on("", ()=>{})
eventBus.ones("", ()=>{})
eventBus.emit("", ()=>{})
eventBus.off("", ()=>{})
```

enjoy it~