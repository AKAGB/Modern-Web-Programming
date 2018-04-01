$(function() {
    // 关闭浏览器缓存
    $.ajaxSetup({
        cache: false
    });
    var 
        resultDiv = $('#info-bar'),
        buttons = $('.button'),
        num_blocks = $('.request-number'),      // 判断是否已经计算过结果
        a_plus_button = $('.icon'),              // @+按钮
        calc_flag = true,                       // 记录计算结果
        calc_result = 0;

    $('#bottom-positioner').mouseout(check_init);
    Initial();

    /*          *\
        函数定义
    \*          */

    function Initial() {
        calc_flag = true;                       // 记录计算结果
        calc_result = 0;
        buttons.off();
        resultDiv.off();
        buttons.css('backgroundColor', '#44547b')
                .click(button_click);
        // 添加大气泡点击事件
        var e = $._data(a_plus_button, 'events');
        if (!e || !e['click'])
            a_plus_button.click(a_plus_click);
        _.map(num_blocks, function(o) {
            o.textContent = '';
        });
        resultDiv.text('');
        check_num(); 
    }

    // 点击@+事件
    function a_plus_click() {
        _.forEach(buttons, function (button) {
            button.click();
        });
        
        $(this).off('click');
    }

    // 点击info块的事件，显示计算结果并灭活
    function click_info() {
        $('#info-bar').text(calc_result);
        $('#info-bar').off('click', click_info);
    }

    // button点击回调函数
    function button_click() {
        $(this).css('backgroundColor', '#7e7e7e')
                .find('.request-number')
                .text('...');
        get_num(this);
        check_num();
    }
    
    // 检查是每个按钮否有数字，没有数字则隐藏红圈
    function check_num() {
        _.map(num_blocks, function(o) {
            if (o.textContent == "") {
                $(o).css('opacity', '0');
            } else {
                $(o).css('opacity', '1');
            }
        });
        return enable_info();
    }

    // 本地测试生成随机数
    /*
    function get_num(clk_btn) {
        var random_time = 1000 + getRandomNumber(2000);
        var random_num  = 1 + getRandomNumber(9);
        setTimeout(function() {
            $(clk_btn).find('.request-number').text(random_num);
            check_num();
        }, random_time);
    }

    function getRandomNumber(limit) {
        return Math.round(Math.random() * limit);
    }
    */

    // ajax请求随机数
    function get_num(clk_btn) {
        var ajax_result = $.ajax('/get_number')
            .done(function (data) {
                $(clk_btn).off('click')
                            .find('.request-number')
                            .text(data);
                if (check_num()) {
                    buttons.css('backgroundColor', '#44547b');
                    resultDiv.click();
                }
            }).fail(function () {
                console.log('Fail!');
            });
    }

    // 激活大气泡
    function enable_info() {
        var 
            info_events = $._data(resultDiv[0], 'events'),
            allNumbers = _.chain(num_blocks)
                            .filter(o => o.textContent.match(/^\d+$/))
                            .map(o => parseInt(o.textContent))
                            .value();
        if (allNumbers.length < 5) {
            resultDiv.off('click', click_info);
        }
        else if (calc_flag && (!info_events || !info_events['click'])) {
            calc_result = _.sum(allNumbers);
            resultDiv.click(click_info);
            calc_flag = false;
        }
        return allNumbers.length == 5;
    }

    // 检查是否处于初始状态
    function check_init() {
        // 等动画执行完毕再检查
        setTimeout(function() {
            if (resultDiv.css('left') == '0px' && resultDiv.css('top') == '0px') 
                Initial();
        }, 1100);
    }
});
