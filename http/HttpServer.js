const net = require("net");

class HttpServer extends net.Server{
    constructor(requestListener){
        super({allowHalfOpen: true});
        if (requestListener){
            this.addListener("request", requestListener);
        }
    }
}