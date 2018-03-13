var fs = require('fs');
var formidable = require('/usr/lib/node_modules/formidable');
var _ = require('lodash');

// 存放用户数据
var usr_datas = {};

function start(request, response) {
    // 加载表单
    console.log('Start is called...');
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('./html/sign_up.html').pipe(response);
}

function upload(request, response) {
    // 返回表单结果
    var form = formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(request, function (err, fields, files) {
        if (err) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found');
        } else {
            // 检查是否有重复的属性
            var repeat = checkData(fields);
            var body = success();

            response.writeHead(200, {'Content-Type': 'text/html; charset="utf-8"'});
            response.write(body);
            response.end();
        }
    });
}

// 检查数据已经存在
// param: fields(表单数据)
// 返回重复数据字符串，没有重复则添加到usr_datas并且返回空串
function checkData(fields) {
    var
        Iusr = _.findKey(usr_datas, ['user_id', fields.user_id]),
        Iid = _.findKey(usr_datas, ['stu_id', fields.stu_id]),
        Iphone = _.findKey(usr_datas, ['phone', fields.phone]),
        Iemail = _.findKey(usr_datas, ['email', fields.email]),
        result = '';

    result += (Iusr) ? '用户名重复！\n' : '';
    result += (Iid) ? '学号重复！\n' : '';
    result += (Iphone) ? '电话重复！\n' : '';
    result += (Iemail) ? '邮箱重复！\n' : '';

    if (!result) {
        // 空串说明没有重复，在usr_datas添加新成员
        usr_datas[fields.stu_id] = {
            'user_id': fields.user_id,
            'stu_id': fields.stu_id,
            'phone': fields.phone,
            'email': fields.email
        };
    }

    return result;
}

function success() {
    return '<!DOCTYPE html>' +
            '<html>' +
                '<head>' +
                    '<meta charset="utf-8">' +
                    '<title>详情</title>' +
                    '<link rel="stylesheet" href="../css/form.css">' +
                '</head>' +
                '<body>' +
                    '<section>' +
                        '<h1>用户详情</h1>' +
                        '<div class="container">' +
                            '<div class="tableRow">' +
                                '<div class="tableCol">' +
                                    '<p class="info">用户名：</p>' +
                                    '<p class="info">学号：</p>' +
                                    '<p class="info">电话：</p>' +
                                    '<p class="info">邮箱：</p>' +
                                '</div>' +
                                '<div class="tableCol">' +
                                    '<p>DreamGQK</p>' +
                                    '<p>16337064</p>' +
                                    '<p>15829090995</p>' +
                                    '<p>gongqk@qq.com</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</section>' +
                '</body>' +
            '</html>';
}

function fail() {
    
}

module.exports = {
    start: start,
    upload: upload
};
