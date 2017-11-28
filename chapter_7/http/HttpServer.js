const net = require("net");

export default class HttpServer extends net.Server{
    constructor(requestListener){
        super();
    }

}