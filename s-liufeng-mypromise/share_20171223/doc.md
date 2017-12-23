# Promise对象

### Promise到底是什么
1. 是一个容器，保存着未来才会结束的操作，通常是一个异步操作。
2. 传统的异步操作都是以事件监听回调函数的形式来书写。
3. Promise是异步编程的一种解决方案，改变原有的异步代码写法，避免了层层嵌套的回调函数，使得不同的异步操作对外暴露统一的接口。

### Promise特点
1. 有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
2. 状态不受外界影响
3. 一旦状态改变，就不会再改变
4. 一旦创建就会立即执行。
5. 如果不设置回调函数，内部抛出的错误，不会反应到外部

### Promise 本例实现了ES6标准下的API & finally
1. Promise.prototype.then
2. Promise.prototype.catch
3. Promise.prototype.finally （非标准）
4. Promise.all
5. Promise.race
6. Promise.resolve
7. Promise.reject

