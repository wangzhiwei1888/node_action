# Promise

### What
1. 广义：是异步编程的一种解决方案
2. 狭义：是一个代码容器
3. 代码：是一个对象

### Feature
1. 三种状态：pending、resolved、rejected
2. 不被干扰性
3. 凝固性
4. 立即执行性
5. 不可中断性
6. 自食恶果性
7. 链式传递性

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
5. 永远传递函数给then函数

### Think
1. ./think/1.js

### Why & Realize your promise
1. Promise.prototype.then
2. Promise.prototype.catch
3. Promise.prototype.finally
4. Promise.all
5. Promise.race
6. Promise.resolve
7. Promise.reject

