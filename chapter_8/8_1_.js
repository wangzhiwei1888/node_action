const cp = require("child_process");

cp.execFile('ls', ['non-existent-directory-to-list'], (err, stdout, stderr) => {
    if (err) {
        console.error('ls err:',err);
    }
    console.log('ls stdout:', stdout);
    console.log('ls stderr:', stderr);
});