var
    server = require('./server'),
    router = require('./router'),
    requestHandler = require('./requestHandler');

var handle = {
    '/': requestHandler.start,
    '/start': requestHandler.start,
    '/upload': requestHandler.upload
};

server.start(router.route, handle);
