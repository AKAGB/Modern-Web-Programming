var
    server = require('./server'),
    router = require('./router'),
    requestHandler = require('./requestHandler');

var handle = {
    '/': requestHandler.start,
    '/start': requestHandler.start
};

server.start(router.route, handle);
