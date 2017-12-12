/**
 * @file Represents a websocket server
 */

const util = require('util');
const net = require('net');
const tls = require('tls');
const EventEmitter = require('events');
let Connection;

function noop() {
}
/**
 * @callback SelectProtocolCallback
 * @param {Connection} connection
 * @param {Array<string>} protocols
 * @returns {?string}
 */

/**
 * Creates a new ws server and starts listening for new connections
 * @class
 * @param {boolean} secure indicates if it should use tls
 * @param {Object} [options] will be passed to net.createServer() or tls.createServer()
 * @param {Array<string>} [options.validProtocols]
 * @param {SelectProtocolCallback} [options.selectProtocol]
 * @param {Function} [callback] will be added as "connection" listener
 * @inherits EventEmitter
 * @event listening
 * @event close
 * @event error an error object is passed
 * @event connection a Connection object is passed
 */

class Server extends EventEmitter {
    constructor(secure, options, callback) {
        super();

        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }

        this.connections = [];
        let onConnection = socket => {
            let conn = new Connection(socket, this, () => {
                this.connections.push(conn);
                conn.removeListener('error', noop);
                this.emit('connection', conn);
            });
            conn.on('close', () => {
                let pos = this.connections.indexOf(conn);
                if (pos !== -1) {
                    this.connections.splice(pos, 1);
                }
            });

            // Ignore errors before the connection is established
            conn.on('error', noop);
        };

        if (secure) {
            this.socket = tls.createServer(options, onConnection)
        }
        else {
            this.socket = net.createServer(options, onConnection)
        }

        this.socket.on('close', () => {
            this.emit('close');
        });

        this.socket.on('error', err => {
            this.emit('error', err);
        });

        if (callback) {
            this.on('connection', callback);
        }

        // Add protocol agreement handling
        /**
         * @member {?SelectProtocolCallback}
         * @private
         */
        this._selectProtocol = null;

        if (options && options.selectProtocol) {
            // User-provided logic
            this._selectProtocol = options.selectProtocol
        }
        else if (options && options.validProtocols) {
            // Default logic
            this._selectProtocol = this._buildSelectProtocol(options.validProtocols)
        }
    }

    /**
     * Start listening for connections
     * @param {number} port
     * @param {string} [host]
     * @param {Function} [callback] will be added as "connection" listener
     */
    listen(port, host, callback) {
        if (typeof host === 'function') {
            callback = host;
            host = undefined;
        }

        if (callback) {
            this.on('listening', callback);
        }

        this.socket.listen(port, host, () => {
            this.emit('listening');
        });

        return this
    }

    close(callback) {
        if (callback) {
            this.once('close', callback)
        }
        this.socket.close();
    }

    /**
     * Create a resolver to pick the client's most preferred protocol the server recognises
     * @param {Array<string>} validProtocols
     * @returns {SelectProtocolCallback}
     * @private
     */
    _buildSelectProtocol(validProtocols) {
        return function (conn, protocols) {
            for (let i = 0; i < protocols.length; i++) {
                if (validProtocols.indexOf(protocols[i]) !== -1) {
                    // A valid protocol was found
                    return protocols[i]
                }
            }
            // No agreement
        }
    }
}

module.exports = Server;

Connection = require('./Connection.js');