// module.exports = require('./charStat.js');

const charStat = require('./charStat.js');

console.time('charStat');
charStat().then(v => {
    console.timeEnd('charStat');
    console.log(v);
});

module.exports = charStat;