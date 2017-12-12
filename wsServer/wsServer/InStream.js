/**
 * @file Simple wrapper for stream.Readable, used for receiving binary data
 */

const stream = require('stream');

/**
 * Represents the readable stream for binary frames
 * @class
 * @event readable
 * @event end
 */
class InStream extends stream.Readable {
    constructor() {
        super();
    }

    /**
     * No logic here, the pushs are made outside _read
     * @private
     */
    _read() {

    }

    /**
     * Add more data to the stream and fires "readable" event
     * @param {Buffer} data
     */
    addData(data) {
        this.push(data)
    }

    /**
     * Indicates there is no more data to add to the stream
     */
    end() {
        this.push(null)
    }

}

module.exports = InStream;
