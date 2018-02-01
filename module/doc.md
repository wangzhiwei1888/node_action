### 一、模块加载时机:

1. 作为启动文件加载 - Module.runMain

2. 通过require加载 - Module.prototype.require

z### 二、模块类别：

1. 内部模块  lib/internal/

2. 原生模块  lib/*.js

   原生加载顺序：

    1) 缓存
    2) 本地原生模块

3. 文件模块

    * **.js。通过fs模块同步读取js文件并编译执行。**:
    * **.json。读取文件，调用JSON.parse解析加载。**:
    * **.node。C/C++编写的Addon。通过dlopen方法进行加载。**:

    文件模块加载顺序：

    1) 缓存
    2) 如果是绝对路径， 则直接按路径读取并编译
    3) 如果是“/”则直接从/node_modules目录查找
    4) 如果是相对路径， 则生成如下查询规则,
    ```
    [
        /home/myapp/mydir/node_module,
        /home/myapp/node_module,
        /home/node_module,
        /node_module,
    ]
    ```
    5) 从上述数组中取出第一个目录作为查找对象， 如果存在结束查找
    6) 然后依次尝试添加.js、.json、.node后缀继续查找， 如果存在则结束
    7) 尝试将require参数作为一个包查找， 读取目录下的package.json文件， 取得main参数指定的文件
    8) 根据指定的文件未找到， 如果没有，执行第6步
    9) 如果main参数不存在或者第8步未找到， 则查找该目录下index文件， 如果没有， 执行第6步
   10) 如果依然没有找到， 则开始取出数组第二条路径， 然后执行5-7步。 直到数组中最后一个值
   11) 如果还没找到， 抛出异常

