const FS = require('fs');
const EventEmitter = require('events');

class Database extends EventEmitter {
    constructor(path) {
        super();
        this._path = path;
        this._records = {};
        this._writeStream = FS.createWriteStream(this.path, {
            encoding: 'utf8',
            flags: 'a'
        });
        this._load();
    }

    get path() {
        return this._path;
    }

    get records() {
        return this._records;
    }

    get writeStream() {
        return this._writeStream;
    }

    _load() {
        let stream = FS.createReadStream(this.path, {encoding: 'utf8'});
        let data = '';
        stream.on('readable', () => {
            data += stream.read();
            let records = data.split('\n');
            data = records.pop();
            for (let i = 0, l = records.length; i < l; i++) {
                try {
                    let record = JSON.parse(records[i]);
                    if (record.value == null) {
                        delete this.records[record.key];
                    }
                    else {
                        this.records[record.key] = record.value;
                    }
                }
                catch (e) {
                    this.emit('error', 'found invalid record:', records[i])
                }

            }
        });
        stream.on('end', () => {
            this.emit('load');
        })
    }

    get(key) {
        return this.records[key] || null;
    }

    set(key, value, cb) {
        let toWrite = JSON.stringify({key: key, value: value}) + '\n';
        if (value == null) {
            delete this.records[key];
        }
        else {
            this.records[key] = value;
        }
        this.writeStream.write(toWrite, cb)
    }

    del(key, cb) {
        return this.set(key, null, cb)
    }
}

module.exports = Database;