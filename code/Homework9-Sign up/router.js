var fs = require('fs');

function route(pathname, handle, request, response) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    }
    else {
        pathname = __dirname + pathname;
        fs.readFile(pathname, function (err, data) {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end('404 Not Found');
            } else {
                var i = pathname.lastIndexOf('.');
                var suffix = pathname.substr(i+1, pathname.length);
                response.writeHead(200, {'Content-Type': 'text/' + suffix});
                response.end(data);
            }
        });


    }
}

module.exports.route = route;
