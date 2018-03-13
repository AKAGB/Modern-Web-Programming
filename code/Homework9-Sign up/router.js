var fs = require('fs');

function route(handle, request, response) {
    var
        pathname = url.parse(request.url).pathname,
        qs = querystring.parse(url.parse(request.url).query);
    console.log('Request for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    }
    else {
        // 请求其他文件如css、js
        loadFile(pathname, response);
    }
}

function loadFile(pathname, response) {
    // 请求文件
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

module.exports.route = route;
