
const http = require("http");
const eventEmitter = require("events");
let emitter = new eventEmitter();
const P = require("../s-liufeng-mypromise/index");

global._CachePath = {};
global.fExeCount = 0; //f方法执行次数
http.createServer((req, res) => {
    // 省略path处理 假设要处理进行缓存结果的path是 /demo
    const PATH = "/demo";
    const PATH_DONE = PATH + "done";
    if (req.url === PATH) {
        let result;
        if (result = global._CachePath[PATH]) {
            res.end(result)
        } else {
            (async function () {
                if (emitter.eventNames().includes(PATH)) {
                    emitter.on(PATH_DONE, r => {
                        result = r;
                    });
                } else {
                    emitter.once(PATH, () => {
                    });
                    result = await f();
                    global._CachePath[PATH] = result;
                    emitter.emit(PATH);
                    emitter.emit(PATH_DONE, result);
                }
                res.end(result)
            })();
        }
        console.log(global.fExeCount);
    }
}).listen(8888);

// 假设这是一系列很耗时的操作
function f() {
    global.fExeCount++;
    return new P(resolve => setTimeout(resolve, 3000, "demo result"));
}