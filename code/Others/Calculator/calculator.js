function display (obj) {
    var outWd = document.getElementById('output');
    outWd.value = outWd.value + obj.value;
}

function deleteToken() {
    var outWd = document.getElementById('output');
    outWd.value = outWd.value.substring(0, outWd.value.length-1);
}

function Calc() {
    var outWd = document.getElementById('output');
    var expr = outWd.value, re = /^(\d+)([\+\-\*\/])(\d+)$/;
    if (re.test(expr)) {      /*检查输入是否正确,这只是简单的判断是否为整数*/
        var arr = re.exec(expr), result;
        if (arr[2] === '/') {
            if (arr[3] === '0') {    /*检查除数是否为0*/
                alert('除数不能为0!');
                result = '';
            } else {
                result = parseInt(arr[1]) / parseInt(arr[3]);
            }
        } else if (arr[2] === '*') {
            result = parseInt(arr[1]) * parseInt(arr[3]);
        } else if (arr[2] === '-') {
            result = parseInt(arr[1]) - parseInt(arr[3]);
        } else {
            result = parseInt(arr[1]) + parseInt(arr[3]);
        }

        outWd.value = result;
    } else if (!expr) {
        alert('请输入表达式!');
        result = '';
    } else {
        alert('输入错误!(暂时支持两个整数的加减乘除运算)');
        result = '';
    }
}

function clearToken() {
    var outWd = document.getElementById('output');
    outWd.value = '';
}
