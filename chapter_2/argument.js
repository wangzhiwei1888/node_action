const fs = require('fs');

let args = {
    '-h': displayHelp,
    '-r': readFile
};

function displayHelp() {
    console.log('Arguments processor:', args);
}

function readFile(file) {
    if (file && file.length) {
        console.log('Reading:', file);
        console.time('read');
        let stream = fs.createReadStream(file);
        stream.on('end', () => {
            console.timeEnd('read');
        });
        stream.pipe(process.stdout);
    } else {
        console.error('A file must be provided with the -r option');
        process.exit(1);
    }
}

if (process.argv.length > 0) {
    process.argv.forEach((arg, index) => {
        // args[arg].apply(this, process.argv.slice(index + 1));
        if (index > 1) {
            args[arg].call(this, process.argv[1]);
        }
    })
}