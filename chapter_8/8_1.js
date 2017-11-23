const cp = require("child_process");

cp.execFile('echo', ['hello', 'world'], (err, stdout, stderr) => {
    if (err) {
        console.error('echo err:',err);
    }
    console.log('echo stdout:', stdout);
    console.log('echo stderr:', stderr);
});

// 查看PATH环境变量包含哪些目录
 console.log('\nPATH DIR:\n' + process.env.PATH.split(':').join('\n') + '\n');



