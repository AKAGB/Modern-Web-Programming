function display (obj) {
    var outWd = document.getElementById('output');
    outWd.value = outWd.value + obj.value;
}

function deleteToken() {
    var outWd = document.getElementById('output');
    outWd.value = outWd.value.substring(0, outWd.value.length-1);
}

function Calc() {
    var expr = document.getElementById('output').value;
    try {
        document.getElementById('output').value = eval(expr);
    }
    catch (e) {
        alert('ERROR: 表达式非法!');
    }
}

function clearToken() {
    var outWd = document.getElementById('output');
    outWd.value = '';
}
