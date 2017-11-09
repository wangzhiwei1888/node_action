const locker = require("./locker");

locker.lock(err => {
    if (err) {
        throw err;
    }
    console.log("lock success");

    // 这里是修改操作 ...

    locker.unlock(err => {
        if (err) {
            throw err;
        }
        console.log("unlock success");
    })

});