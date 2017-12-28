# Promise

### What
1. 广义层面：是异步编程的一种解决方案，传统的异步操作都是以事件监听回调函数的形式,改变原有的异步代码写法，避免了层层嵌套的回调函数。
2. 狭义层面：是一个容器，保存着未来才会结束的操作，通常是一个异步操作。
3. 代码语法：是一个对象，从它可以获取异步操作的消息，控制代码结构和流程。对外暴露统一的接口,使得不同的异步操作以同样的方式进行处理。

### Feature
1. 三种状态：pending（进行中）初始状态，未完成或未拒绝，代表异步操作未完成、resolved（已成功）通常表示异步操作成功，rejected（已失败）意味着异步操作失败
2. 不被干扰性：状态不受外界影响
3. 凝固性：一旦状态改变，就不会再改变
4. 立即执行性：一旦创建就会立即执行。
5. 不可中断性：一旦创建了创建了就没办法中断。
6. 自食恶果性：如果不设置回调函数，内部抛出的错误，不会反应到外部
7. 链式传递性：

### How
1. 基本用法：
    1) 创建阶段：构造函数、构造函数的两个参数
    2) 生成实例：then catch finally
    3) 静态方法：all race  reject resolve
2.


### Attention
1. 不要把promise写成嵌套
2. 将你的链条以catch终结
3. then方法中永远return 或 throw
4. 不给then函数传第二个参数
5. 永远传递函数给then方法

### Think
1. ./think/1.js


### Why & Realize
1. Promise.prototype.then
2. Promise.prototype.catch
3. Promise.prototype.finally
4. Promise.all
5. Promise.race
6. Promise.resolve
7. Promise.reject

