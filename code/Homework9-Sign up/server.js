var http = require('http');
var url = require('url');

function start(route, handle) {
    http.createServer(function (request, response) {
        var pathname = url.parse(request.url).pathname;
        route(pathname, handle, request, response);
    }).listen('8080');
    console.log('Server is running at http://localhost:8080...');
}

module.exports.start = start;
