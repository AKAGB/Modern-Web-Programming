var
    server = require('./server'),
    router = require('./router'),
    requestHandler = require('./requestHandler');

var handle = {
    '/': requestHandler.start,
    '/start': requestHandler.start,
    '/upload': requestHandler.upload
};

requestHandler.load();
server.start(router.route, handle);
