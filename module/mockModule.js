class Module {
    constructor() {
        this.exports = {};
    }

    // ...
}

let module = new Module();

(function (exports, module, require, __filename, __dirname) {

    // <-- 这里是真正的文件内容 -->

})(module.exports, module);