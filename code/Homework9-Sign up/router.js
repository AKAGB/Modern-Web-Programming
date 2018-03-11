function route(pathname, handle, request, response) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('404 Not Found');
    }
}

module.exports.route = route;
