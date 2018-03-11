var fs = require('fs');

function start(request, response) {
    // 加载表单
    console.log('Start is called...');
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('./html/sign_up.html').pipe(response);
}

module.exports = {
    start: start
};
