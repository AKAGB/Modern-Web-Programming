$(function () {
    var inputs = $('input');
    var submit = $('button[type="submit"]');

    submit.click(function () {
        if (!(/^[A-Za-z][\w\_]{5,17}$/).test(inputs[0].value)) {
            // 用户名匹配6~18位英文字母、数字或下划线，但必须以字母开头
            alert('用户名6~18位英文字母、数字或下划线，必须以英文字母开头');
            return false;
        }
        else if (!(/^[1-9]\d{7}$/).test(inputs[1].value)) {
            // 学号8位数字，不能以0开头
            alert('学号8位数字，不能以0开头');
            return false;
        }
        else if (!(/^[1-9]\d{10}$/).test(inputs[2].value)) {
            // 电话11位数字，不能以0开头
            alert('电话11位数字，不能以0开头');
            return false;
        }
        else if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(inputs[3].value)) {
            // 邮箱验证
            alert('邮箱格式错误');
            return false;
        }
        return true;
    });

});
