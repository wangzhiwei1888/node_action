const fs = require("fs");

let hasLock = false;
let lockDir = "config.lock";

function lock(cb) {
    if (hasLock) {
        return cb();
    }
    fs.mkdir(lockDir, err => {
        if (err) {
            return cb(err);
        }
        fs.writeFile(`${lockDir}/${process.pid}`, err => {
            if (err) {
                console.error(err);
            }
            hasLock = true;
            return cb();
        })

    })
}

function unlock(cb) {
    if (!hasLock) {
        return cb();
    }
    fs.unlink(`${lockDir}/${process.pid}`, err => {
        if (err) {
            return cb(err);
        }
        fs.rmdir(lockDir, err => {
            if (err) {
                return cb(err);
            }
            hasLock = false;
            cb()
        })
    })
}

process.on('exit', () => {
    if (hasLock) {
        fs.unlinkSync(`${lockDir}/${process.pid}`);
        fs.rmdirSync(lockDir);
        console.log('removed lock');
    }
});

module.exports = {
    lock: lock,
    unlock: unlock,
};