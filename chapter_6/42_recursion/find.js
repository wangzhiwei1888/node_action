const FS = require('fs');
const PATH = require('path');

module.exports = function (nameRe, startPath, cb) {
    let results = [];
    let asyncOps = 0;
    let errored = false;

    function error(err) {
        if (!errored) {
            cb(err);
        }
        errored = true;
    }

    function find(path) {
        asyncOps++;
        FS.readdir(path, (err, files) => {
            if (err) {
                return error(err);
            }
            files.forEach((file => {
                let filePath = PATH.join(path, file);
                asyncOps++;
                FS.stat(filePath, (err, stats) => {
                    if (err) {
                        return error(err);
                    }
                    if (stats.isDirectory()) {
                        find(filePath);
                    }
                    if (stats.isFile() && nameRe.test(file)) {
                        results.push(filePath);
                    }
                    asyncOps--;
                    if (asyncOps == 0) {
                        cb(null, results);
                    }
                })
            }));
            asyncOps--;
            if (asyncOps == 0) {
                cb(null, results);
            }
        });
    }

    find(startPath);
};