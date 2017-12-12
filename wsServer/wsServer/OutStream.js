/**
 * @file Simple wrapper for stream.Writable, used for sending binary data
 */

const util = require('util');
const stream = require('stream');
const frame = require('./frame.js');

/**
 * @class Represents the writable stream for binary frames
 * @param {Connection} connection
 * @param {number} minSize
 */
class OutStream extends stream.Writable {
    constructor(connection, minSize) {
        super();
        this.connection = connection;
        this.minSize = minSize;
        this.buffer = new Buffer(0);
        this.hasSent = false;// Indicates if any frame has been sent yet
        this.on('finish', () => {
            if (this.connection.readyState === this.connection.OPEN) {
                // Ignore if not connected anymore
                this.connection.socket.write(frame.createBinaryFrame(this.buffer, !this.connection.server, !this.hasSent, true))
            }
            this.connection.outStream = null
        })
    }

    /**
     * @param {Buffer} chunk
     * @param {string} encoding
     * @param {Function} callback
     * @private
     */
    _write(chunk, encoding, callback) {
        this.buffer = Buffer.concat([this.buffer, chunk], this.buffer.length + chunk.length);
        if (this.buffer.length >= this.minSize) {
            if (this.connection.readyState === this.connection.OPEN) {
                // Ignore if not connected anymore
                let frameBuffer = frame.createBinaryFrame(this.buffer, !this.connection.server, !this.hasSent, false);
                this.connection.socket.write(frameBuffer, encoding, callback)
            }
            this.buffer = new Buffer(0);
            this.hasSent = true;
            if (this.connection.readyState !== this.connection.OPEN) {
                callback()
            }
        }
        else {
            callback()
        }
    }
}

module.exports = OutStream;


