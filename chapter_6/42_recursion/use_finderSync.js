const findSync = require("./findSync.js");

try {
    let result = findSync(/.*.js/,'../');
    console.log(result);
}
catch (err) {
    console.error(err);
}