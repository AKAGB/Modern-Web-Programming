var http = require('http');

function start(route, handle) {
    http.createServer(function (request, response) {
        route(handle, request, response);
    }).listen('8080');
    console.log('Server is running at http://localhost:8080...');
}

module.exports.start = start;
