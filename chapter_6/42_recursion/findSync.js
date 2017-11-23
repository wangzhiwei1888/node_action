const FS = require("fs");
const PATH = require("path");

module.exports = function (nameRe, startPath) {
    let result = [];

    function find(path) {
        let files = FS.readdirSync(path);
        for (let i = 0, l = files.length; i < l; i++) {
            let filePath = PATH.join(path, files[i]);
            let stats = FS.statSync(filePath);
            if (stats.isDirectory()) {
                find(filePath);
            }
            if (stats.isFile() && nameRe.test(files[i])) {
                result.push(filePath);
            }
        }
    }

    find(startPath);
    return result;
};


