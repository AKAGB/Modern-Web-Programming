var fs = require('fs');
var formidable = require('/usr/local/lib/node_modules/formidable');

function start(request, response) {
    // 加载表单
    console.log('Start is called...');
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('./html/sign_up.html').pipe(response);
}

function update(request, response) {
    // 返回表单结果
    var form = formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(request, function (err, fileds, files) {
        
    });
}

module.exports = {
    start: start
};
